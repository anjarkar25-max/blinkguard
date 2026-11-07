# 🛡️ BlinkGuard

**Pre-Sign AI Transaction Firewall & Natural-Language Trading Copilot on Solana**

*Built for the Solana Global Hackathon (Major League Hacking)*

---

## ⚡ The Problem

1. **Blind Signing & Phishing Drainers:** Users frequently authorize token delegation, malicious escrow instructions, or fake airdrops because standard wallet approval popups obscure contract logic.
2. **Autonomous Agent Security Risks:** AI agents operating on Solana lack standardized, independent execution guardrails, making them vulnerable to prompt injections and compromised swap routes.
3. **Complex DeFi Friction:** Navigating decentralized exchanges, slippage tolerances, and token mints presents a steep barrier for non-technical users.

---

## 💡 Solution: What is BlinkGuard?

BlinkGuard provides an active, two-sided defensive layer on Solana:

* **For End Users:** A natural-language DeFi swap copilot that simulates transactions, calculates risk scores (0–100), and disables signature actions upon detecting malicious drainer patterns.
* **For Autonomous AI Agents:** A standardized Solana Agent Skill endpoint (`/api/skill`) and SDK (`lib/solanaAgentSkill.ts`) that functions as preflight firewall middleware before any agent executes a transaction.

---

## ✨ Key Features

* **Natural-Language Swap Copilot:** Translates natural queries (e.g., *"Swap 0.5 SOL to USDC"*) into validated token parameters and routes using Google Gemini 2.5 Flash.
* **Pre-Sign Simulation Firewall:** Inspects incoming instructions, calculates token balance diffs, and computes a comprehensive Risk Score (0–100).
* **Automated Signature Lockout:** Disables wallet approval actions when unbounded authority delegation, drainer signatures, or excessive slippage are detected.
* **Jupiter V6 Aggregation:** Fetches real-time market rates and optimized liquidity routes across Solana AMMs.
* **Cryptographic Attestation:** Emits a cryptographic pre-execution audit receipt verified through Phantom Wallet (`signMessage`).
* **Solana Agent Skill Standard:** Provides a machine-readable JSON tool manifest and audit handler enabling any Solana Agent Kit or autonomous runtime to invoke BlinkGuard as an execution guardrail.

---

## 🛠️ Tech Stack

* **Framework & Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons
* **Blockchain & Wallet:** Solana Web3.js (`@solana/web3.js`), Solana Wallet Adapter (Phantom, Solflare)
* **AI Core:** Google GenAI SDK (`gemini-2.5-flash` with Structured Outputs)
* **DEX Routing:** Jupiter Aggregator API v6
* **Agent Integration:** Solana Agent Skills specification (`/api/skill`, `lib/solanaAgentSkill.ts`)
* **Deployment:** Vercel

---

## 🏗️ Architecture & Execution Flow

```text
User / Agent Prompt
       │
       ▼
[/api/parse] (Gemini 2.5 Flash)
       │
       ├─► Threat Detected (Risk Score ≥ 80)
       │     └─► [LOCK] Signature disabled & drainer vector flagged
       │
       └─► Intent Benign (Risk Score < 20)
             │
             ├─► [Jupiter v6] Optimized swap route fetched
             ├─► [Simulation] Expected in/out balances confirmed
             └─► [Wallet] Phantom signs preflight attestation receipt

{
  "name": "blinkguard_preflight_firewall",
  "description": "Simulates and audits Solana transactions or user prompts before signing. Detects malicious drainers, unbounded token delegations, and excessive slippage.",
  "parameters": {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "Natural-language intent or serialized transaction to verify."
      },
      "userAddress": {
        "type": "string",
        "description": "The public key of the signer."
      }
    },
    "required": ["prompt"]
  }
}

{
  "prompt": "Swap 0.5 SOL to USDC",
  "userAddress": "YourSolanaPublicKeyHere"
}

{
  "allowed": true,
  "riskScore": 3,
  "action": "VERIFIED",
  "reason": "Transaction verified benign via Jupiter V6 standard route."
}

{
  "allowed": false,
  "riskScore": 99,
  "action": "BLOCKED",
  "reason": "Unbounded authority delegation / drainer signature vector detected."
}

### Request Payload
```json
{
  "prompt": "Swap 0.5 SOL to USDC with 1% slippage",
  "userAddress": "YourSolanaPublicKeyHere"
}
```
