export const blinkGuardAgentSkill = {
  name: "blinkguard_audit",
  description: "Audits a proposed Solana transaction payload or intent for drainers and security risks.",
  execute: async ({ prompt, userAddress }: { prompt: string; userAddress?: string }) => {
    const response = await fetch("https://blinkguard-uoq6-six.vercel.app/api/skill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, userAddress }),
    });
    return await response.json();
  },
};
