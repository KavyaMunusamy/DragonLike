# Automation Builder (MVP)

Speak your IT automations into existence—AI that builds the future, one conversation at a time.

## What this is
- **Chat-based UI** to describe IT workflows (e.g., onboarding, alerts).
- **Backend services** that stub AWS Bedrock parsing, code generation, sandbox testing, and mock deployment to Step Functions/Lambda.
- **Knowledge base** stores templates in-memory (for hackathon demo).

## Tech Stack
- **Frontend:** Static HTML + minimal JS.
- **Backend:** Node.js + Express.
- **Integrations (stubs):** AWS Bedrock, AWS Step Functions, SuperOps API.

## Project Structure
```
backend/
  package.json
  src/
    config.js
    server.js
    routes/
      workflows.js
    services/
      bedrock.js
      sandbox.js
      stepFunctions.js
      superops.js
      knowledgeBase.js
frontend/
  index.html
.env.example
README.md
```

## Setup
1. Copy env
```bash
cp .env.example .env
```
(edit values as needed; defaults are fine for the stub demo)

2. Install backend deps
```bash
cd backend
npm install
```

3. Run server
```bash
npm start
```
Open http://localhost:3000 in your browser.

## Demo Flow
- **Parse:** Converts NL prompt to a structured workflow (stub via `bedrock.js`).
- **Generate:** Produces a Python Lambda-like handler for the workflow (`bedrock.js`).
- **Test:** Runs a simulated sandbox execution (no real code eval) (`sandbox.js`).
- **Deploy:** Returns a mock Step Functions/Lambda deployment (`stepFunctions.js`) and saves a template in the in-memory KB.
- **Templates:** `GET /api/templates` returns previous saved workflows.

## Notes
- All cloud calls are stubbed; no credentials are required.
- For real AWS Bedrock/Step Functions/SuperOps integration, replace stubs with SDK calls and secure the server.
- Optional: add Amazon Lex to front the chat input in production.

## MVP Scope Fit
Handles 1–2 representative workflows (e.g., high-priority ticket alert). Extend by:
- Adding real SuperOps API calls in `superops.js`.
- Emitting AWS Step Functions state machines from `deployWorkflow()`.
- Persisting templates in DynamoDB instead of memory.


### Testing Case
- Automate user onboarding for a new marketing hire named Jane Smith, including creating an account in SuperOps and sending a welcome email in Python.
- If a ticket is marked as high priority, notify the IT manager via email and assign it to the network team using SuperOps in Python.
- Check server disk space and alert the admin if it’s below 20%.