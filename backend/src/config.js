import dotenv from 'dotenv';
import path from 'path';

// Load root-level .env (project root), then allow backend/.env to override
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  awsRegion: process.env.AWS_REGION || 'us-east-1',
  bedrockModelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0',
  bedrockApiKey: process.env.BEDROCK_API_KEY || process.env.AWS_BEARER_TOKEN_BEDROCK || '',
  bedrockHttpUrl: process.env.BEDROCK_HTTP_URL || 'https://api.bedrock.ai',
  bedrockParseUrl: process.env.BEDROCK_PARSE_URL || '',
  bedrockGenerateUrl: process.env.BEDROCK_GENERATE_URL || '',
  bedrockParsePath: process.env.BEDROCK_PARSE_PATH || '/invoke',
  bedrockGeneratePath: process.env.BEDROCK_GENERATE_PATH || '/invoke',
  bedrockAgentId: process.env.BEDROCK_AGENT_ID || '',
  bedrockAgentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID || '',
  superOpsApiKey: process.env.SUPEROps_API_KEY || '',
  superOpsBaseUrl: process.env.SUPEROps_BASE_URL || 'https://api.superops.ai',
  dynamoTable: process.env.DYNAMO_TABLE || 'automation_templates',
};
