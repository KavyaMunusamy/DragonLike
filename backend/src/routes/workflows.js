import { Router } from 'express';
import { generateCodeForWorkflow, parsePromptToWorkflow } from '../services/bedrock.js';
import { listTemplates, saveTemplate } from '../services/knowledgeBase.js';
import { runInSandbox } from '../services/sandbox.js';
import { deployWorkflow } from '../services/stepFunctions.js';

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

// SuperOps integration endpoints
router.get('/superops/test', async (_req, res) => {
  try {
    const client = new SuperOpsClient();
    const result = await client.testConnection();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/superops/ticket', async (req, res) => {
  try {
    const client = new SuperOpsClient();
    const result = await client.createTicket(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/superops/notify', async (req, res) => {
  try {
    const { ticketId, channel, message } = req.body;
    const client = new SuperOpsClient();
    const result = await client.notifyManager(ticketId, channel, message);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/superops/user', async (req, res) => {
  try {
    const client = new SuperOpsClient();
    const result = await client.createUser(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// AWS Bedrock test endpoint
router.get('/bedrock/test', async (_req, res) => {
  try {
    const testWorkflow = {
      id: 'test-123',
      name: 'Test Workflow',
      sourcePrompt: 'Test AWS Bedrock integration'
    };
    const result = await generateCodeForWorkflow(testWorkflow);
    res.json({ 
      success: true, 
      message: 'AWS Bedrock integration working',
      codeGenerated: !!result.code,
      model: 'anthropic.claude-3-sonnet-20240229-v1:0'
    });
  } catch (e) {
    res.status(500).json({ 
      success: false, 
      error: e.message,
      message: 'AWS Bedrock integration failed'
    });
  }
});

export default router;
