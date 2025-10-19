import { Router } from 'express';
import { parsePromptToWorkflow } from '../services/bedrock.js';
import { generateCodeForWorkflow } from '../services/bedrock.js';
import { runInSandbox } from '../services/sandbox.js';
import { deployWorkflow } from '../services/stepFunctions.js';
import { listTemplates, saveTemplate } from '../services/knowledgeBase.js';

const router = Router();

router.post('/parse', async (req, res) => {
  try {
    const { prompt } = req.body;
    const workflow = await parsePromptToWorkflow(prompt);
    res.json({ workflow });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const { workflow } = req.body;
    const code = await generateCodeForWorkflow(workflow);
    res.json({ code });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/test', async (req, res) => {
  try {
    const { code, inputs } = req.body;
    const result = await runInSandbox(code, inputs);
    res.json({ result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/deploy', async (req, res) => {
  try {
    const { workflow, code, metadata } = req.body;
    const deployment = await deployWorkflow(workflow, code, metadata);
    await saveTemplate(workflow, code, metadata);
    res.json({ deployment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/templates', async (_req, res) => {
  try {
    const templates = await listTemplates();
    res.json({ templates });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
