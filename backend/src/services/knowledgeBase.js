const inMemory = [];

export async function listTemplates() {
  return inMemory.slice().reverse();
}

export async function saveTemplate(workflow, code, metadata) {
  inMemory.push({ id: String(inMemory.length + 1), workflow, code, metadata, savedAt: new Date().toISOString() });
}
