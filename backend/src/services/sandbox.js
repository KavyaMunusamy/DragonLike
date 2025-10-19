// Very simple in-process sandbox for demo purposes only (not secure for production)
// Executes generated Python by simulating a call rather than running arbitrary code.

export async function runInSandbox(codeBundle, inputs) {
  // For demo, we don't execute Python. We simulate based on inputs.
  const { code } = codeBundle || {};
  const ticket = inputs?.ticket || { id: 'T-1', priority: 'high' };
  const simulated = ticket.priority === 'high'
    ? { action: 'notify_manager', result: { status: 'sent', ticket_id: ticket.id, channel: 'email' } }
    : { action: 'none' };

  return {
    ok: true,
    logs: ['Simulated execution, no real code run.'],
    output: simulated,
    digest: String(code?.length || 0),
  };
}
