// const Groq = require("groq-sdk");
const { GoogleGenAI } = require("@google/genai");
const pool = require("../db");

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateContent = async (req, res) => {
  const userId = req.user.id;
  const {
    businessName,
    targetAudience,
    contentType,
    duration,
    frequency,
    details,
  } = req.body;
  if (
    !businessName ||
    !targetAudience ||
    !contentType ||
    !duration ||
    !frequency ||
    !details
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const prompt = `
You are an expert AI content strategist and professional scriptwriter.

Generate a complete, structured social media content plan based on the following information:

BUSINESS INFO:
- Name: "${businessName}"
- Target Audience: "${targetAudience}"
- Content Type: "${contentType}" (e.g., short videos, long videos, carousels, posts, etc.)
- Plan Duration: "${duration}"
- Posting Frequency: "${frequency}"
- Additional Details: "${details}"

TASK:
1. Create a full content plan for the selected duration and posting frequency 
   (e.g., if 2 weeks daily = 14 content ideas).
2. Each content item must be fully detailed, practical, and directly ready for publishing.

For each content item, include:
- **day**: e.g., "Day 1"
- **title**: a catchy post title or hook.
- **idea**: a short description of the main content concept.
- **script**: a *ready-to-record, word-for-word* spoken script that the user can read directly on camera.
    - If the content type includes "short video" or "Reels" → make it 60–90 seconds long (about 100–120 words).
    - If the content type includes "long video" → make it **at least 5 minutes long** (about 700–900 words) with a clear intro, body, and outro.
    - Ensure the tone is natural, conversational, and brand-aligned.
- **caption**: a social media caption that summarizes or teases the content.
- **hashtags**: 5–10 relevant hashtags.
- **call_to_action**: a short CTA like “Subscribe for more”, “Book now”, or “Learn more”.
- **visual_suggestion**: describe visuals, b-roll, or camera shots that match the script.

Return the result in **strict JSON format** exactly like this:

{
  "content": [
    {
      "day": "Day 1",
      "title": "...",
      "idea": "...",
      "script": "Exact spoken script here (word-for-word).",
      "caption": "...",
      "hashtags": ["...", "..."],
      "call_to_action": "...",
      "visual_suggestion": "...",
      "content_type": "..."
    }
  ],
  "schedule": "${frequency}"
}

IMPORTANT RULES:
- Do NOT include Markdown, backticks, or explanations — only valid JSON.
- The "script" field must contain a **complete spoken script**, not just bullet points.
- Long video scripts must be detailed and flow naturally with storytelling and value.
- Match tone, style, and CTAs to the provided business info and target audience.
- The total number of content items must match the duration and posting frequency.
`;

  try {
    // const completion = await groq.chat.completions.create({
    //   model: "openai/gpt-oss-20b",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You generate structured JSON responses only",
    //     },
    //     { role: "user", content: prompt },
    //   ],
    // });

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    let raw = response.text.trim();

    // Remove ```json or ``` if Groq wraps the output
    raw = raw
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    data = JSON.parse(raw);

    const { content, schedule } = data;

    const draftResult = await pool.query(
      "INSERT INTO drafts (user_id, title, schedule) VALUES ($1, $2, $3) RETURNING id",
      [userId, businessName, schedule]
    );

    const draftId = draftResult.rows[0].id;

    for (const con of content) {
      const contentResult = await pool.query(
        "INSERT INTO content (draft_id, day, title, idea, script, caption, hashtags, call_to_action, visual_suggestion, content_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          draftId,
          con.day,
          con.title,
          con.idea,
          con.script,
          con.caption,
          JSON.stringify(con.hashtags),
          con.call_to_action,
          con.visual_suggestion,
          con.content_type,
        ]
      );
    }

    res.status(201).json({
      message: "Ai-generated plan successfully",
      draftId,
      content,
      schedule,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getAllDrafts = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT id, title, schedule, created_at FROM drafts WHERE user_id = $1",
      [userId]
    );

    res
      .status(200)
      .json({ message: "Fetched successfullt", drafts: result.rows });
  } catch (err) {
    console.error(err);
  }
};

exports.getContentByDraftId = async (req, res) => {
  const { draftId } = req.params;

  try {
    const contentResult = await pool.query(
      "SELECT * FROM content WHERE draft_id = $1",
      [draftId]
    );

    const scheduleResult = await pool.query(
      "SELECT schedule FROM drafts WHERE id = $1",
      [draftId]
    );

    res.status(200).json({
      message: "content fetched successfully",
      content: contentResult.rows,
      schedule: scheduleResult.rows[0]?.schedule,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.editContent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    idea,
    script,
    caption,
    hashtags,
    call_to_action,
    visual_suggestion,
  } = req.body;

  if (
    !title ||
    !idea ||
    !script ||
    !caption ||
    !hashtags ||
    !call_to_action ||
    !visual_suggestion
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE content SET title = $1, idea = $2, script = $3, caption = $4, hashtags = $5, call_to_action = $6, visual_suggestion= $7 WHERE id = $8",
      [
        title,
        idea,
        script,
        caption,
        JSON.stringify(hashtags),
        call_to_action,
        visual_suggestion,
        id,
      ]
    );

    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteContent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM content WHERE id = $1", [id]);

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};
