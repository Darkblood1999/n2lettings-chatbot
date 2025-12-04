# N2 Lettings Chatbot (Node.js + Express)

## What's included
- Backend: `server.js` (Express) that serves `public/` and exposes `/chat` POST endpoint.
- Frontend: `public/index.html`, `public/chat-widget.js`, `public/chat-widget.css`
- `data/faqs.json` for quick FAQ fallback responses
- `.env.example` showing environment variables

## Quick start (local)
1. Install Node.js (LTS).
2. Extract the ZIP and open a terminal in the project folder.
3. Run:
   ```
   npm install
   cp .env.example .env
   # edit .env and put your OPENAI_API_KEY if you want live OpenAI responses
   npm start
   ```
4. Open browser: http://localhost:3000

## Notes
- The server uses the OpenAI API **only if** you set `OPENAI_API_KEY` in `.env`. Otherwise the server replies using the simple FAQ file.
- To integrate on a live website, copy contents of `public/chat-widget.js` into your site's footer and set the `API_BASE` in that file to your deployed backend URL.
