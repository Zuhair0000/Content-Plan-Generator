const Groq = require("groq-sdk");
const pool = require("../db");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
You are an expert AI content strategist.

Generate a complete, structured content plan for social media based on the following information:

BUSINESS INFO:
- Name: "${businessName}"
- Target Audience: "${targetAudience}"
- Content Type: "${contentType}"
- Plan Duration: "${duration}"
- Posting Frequency: "${frequency}"
- Additional Details: "${details}"

TASK:
1. Create a full content plan for the selected duration and frequency (e.g., if 2 weeks daily = 14 content ideas).
2. Each content entry must be detailed and ready-to-use.

For each content item, include:
- title: a catchy post title or hook.
- idea: a detailed description of the content idea or concept.
- script: if it's a video, include a ready-to-record script or outline.
- caption: a social media caption.
- hashtags: 5–10 relevant hashtags.
- call_to_action: a simple CTA like “Book now”, “Follow for more”, or “Learn more”.
- visual_suggestion: what visuals or shots to use.

Return the result in **strict JSON format** like this:

{
  "content": [
    {
      "day": "Day 1",
      "title": "...",
      "idea": "...",
      "script": "...",
      "caption": "...",
      "hashtags": ["...", "..."],
      "call_to_action": "...",
      "visual_suggestion": "...",
      "content_type": "..."
    }
  ],
  "schedule": "${frequency}"
}

Make sure:
- The total number of content items matches the duration and posting frequency.
- The tone, ideas, and CTAs are creative, realistic, and relevant to the provided details.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You generate structured JSON responses only",
        },
        { role: "user", content: prompt },
      ],
    });

    let raw = completion.choices[0].message.content.trim();

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
