🐝 HiveContent — AI-Powered Content Planning Platform
HiveContent is an intelligent content planning tool designed to help creators, marketers, and businesses plan, generate, and manage content efficiently using AI.
It transforms your ideas into organized, engaging, and actionable content — from concept to post.

Link: https://www.hive-content.com/
⸻

🚀 Features
	•	🤖 AI-Powered Content Generation — Automatically generate content ideas, scripts, captions, and visuals based on your brand or niche.
	•	🧠 Smart Scheduling — Plan and visualize your posting schedule (daily or weekly) using an intuitive timeline.
	•	🗂️ Content Management — Edit, delete, and organize all your AI-generated content in one place.
	•	🧩 Customizable Content Types — Create various types of content such as Reels, Posts, Blogs, or Emails.
	•	🔐 JWT Authentication — Secure user access and personalized content storage.
	•	💾 Supabase Integration — Reliable cloud database for storing content and user data.
	•	🎨 Modern UI — Built with React.js, Tailwind CSS, and beautiful gradient design.
	•	🧭 Seamless UX — Smooth navigation between tabs: Overview, Content, Schedule, and Settings.

⸻

🧰 Tech Stack

Frontend:
	•	React.js
	•	Tailwind CSS
	•	Lucide Icons
	•	React Hot Toast

Backend:
	•	Node.js
	•	Express.js
	•	Supabase (PostgreSQL)
	•	JWT Authentication
	•	dotenv for environment management

⸻

🏗️ Folder Structure

HiveContent/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── .env
│   ├── server.js
│
├── frontend/
│   ├── src/
│    ├── components/
│    ├── pages/
│    ├── assets/
│    ├── App.jsx
│    └── main.jsx
│   
│
└── README.md


⸻

⚙️ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/yourusername/HiveContent.git
cd HiveContent

2️⃣ Install Dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend
npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend folder and add:

PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret_key

4️⃣ Run the App

Start the backend:

cd backend
npm start

Start the frontend:

cd frontend
npm run dev


⸻

🧩 API Endpoints

Method	Endpoint	Description
POST	/api/content/generate	Generate AI-powered content
GET	/api/content	Get all user content
PUT	/api/content/edit/:id	Edit specific content
DELETE	/api/content/delete/:id	Delete specific content


⸻

🎨 UI Overview
	•	Dashboard — Displays an overview of your generated content and schedule.
	•	Content Tab — Manage and edit your AI-generated content.
	•	Schedule Tab — Visualize your posting schedule with timeline cards.

⸻

🌟 Vision

HiveContent empowers creators to focus on creativity, not logistics.
By combining AI generation, automation, and smart scheduling — it turns your brand’s message into consistent, impactful content.

⸻

🧑‍💻 Author

Zuhair Hassan
Software Engineer | Full-Stack & AI Developer
📍 Based in Malaysia
📧 zuhairhassan52@gmail.com
