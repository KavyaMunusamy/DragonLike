import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import workflowsRouter from './routes/workflows.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// API routes
app.use('/api', workflowsRouter);

// Serve frontend static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../../frontend');
app.use(express.static(frontendDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Automation Builder backend running on http://localhost:${config.port}`);
});
