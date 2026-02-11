🧠 Silent Support
Anonymous Student Mental Health Platform
LPU Hackathon – SDG 3 (Good Health & Well‑Being)

🚨 Problem Context
Students face:

Exam pressure

Placement anxiety

Social comparison

Emotional burnout

Despite rising stress levels, very few students seek help due to:

Fear of judgment

Fear of being labeled

Privacy concerns

The challenge was to build a platform that listens without asking who you are.

💡 Our Solution
Silent Support is a privacy‑first, anonymous mental wellness web platform that allows students to:

Assess their stress levels

Receive immediate emotional support

Access structured recovery guidance

Explore trusted support resources

All without login, tracking, or storing personal data.

🎯 Core Features (Aligned with Hackathon Requirements)
✅ 1. Anonymous Access
No login required

No data stored

Fully client-side architecture

✅ 2. Structured Mental Health Assessment
Student-focused questionnaire

1–5 scale response system

Real-time stress scoring

Stress levels categorized as:

🟢 Low

🟡 Medium

🔴 High

✅ 3. Quick Emotional Check‑In
Lightweight, non-intrusive entry point

Immediate calming interface

No scoring pressure

✅ 4. Calm Mode
Guided breathing timer

Visually soothing UI

Helps regulate stress instantly

✅ 5. Personalized Recovery Plan
Dynamic 7‑day structured plan

Action-oriented recommendations

Based on stress level

✅ 6. Support Directory
Helplines

Counseling resources

Immediate assistance access

✅ 7. Professional UI/UX
Soft psychological color palette

Light / Dark mode

Clean, distraction-free interface

Fully responsive design

🏗 Technical Architecture
Frontend
Next.js (App Router)

React with TypeScript

Styling
Tailwind CSS

Logic & Scoring
Fully client-side (browser-based)

Deterministic scoring algorithm

No backend required

Deployment
Vercel (production-ready)

🔐 Why No Backend?
We intentionally chose a client-side architecture to:

Ensure maximum privacy

Avoid storing sensitive mental health data

Reduce security risks

Deliver a stable solution within 16-hour constraints

This aligns directly with the problem’s emphasis on anonymous support.

📊 How Scoring Works
Each question is rated on a numeric scale.

Total score is calculated in the browser and classified into:

Low Stress → Preventive guidance

Medium Stress → Structured coping support

High Stress → Immediate calming + external help suggestion

No user responses are stored.
