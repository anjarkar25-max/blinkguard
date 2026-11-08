# 🛡️ BlinkGuard

**Pre-Sign AI Transaction Firewall & Natural-Language Trading Copilot on Solana**

*Built for the Solana Global Hackathon (Major League Hacking)*

[![Live App](https://img.shields.io/badge/Live_dApp-Vercel-black?style=for-the-badge&logo=vercel)](https://blinkguard-uoq6-six.vercel.app)
[![Solana Skill](https://img.shields.io/badge/Solana_Agent_Skill-Endpoint-purple?style=for-the-badge)](https://blinkguard-uoq6-six.vercel.app/api/skill)
[![YouTube Demo](https://img.shields.io/badge/Demo_Video-YouTube-red?style=for-the-badge&logo=youtube)](https://youtu.be/l7HRs26oFD8)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## ⚡ The Problem

1. **Blind Signing & Phishing Drainers:** Users frequently authorize unbounded token delegations, malicious escrow instructions, or fake airdrop claims because standard wallet approval dialogs obscure transaction logic.
2. **Autonomous Agent Security Risks:** AI trading agents operating on Solana lack standardized, independent preflight execution guardrails, exposing them to prompt injections and compromised swap routes.
3. **Complex DeFi Friction:** Navigating decentralized exchanges, slippage thresholds, liquidity routes, and mint addresses presents a steep technical barrier for everyday users.

---

## 💡 Solution: What is BlinkGuard?

BlinkGuard delivers an active, two-sided defensive layer on Solana:

* **For End Users:** A natural-language DeFi copilot that simulates transactions, scores threats (0–100), and dynamically disables signature actions upon detecting malicious drainer patterns.
* **For Autonomous AI Agents:** A standardized Solana Agent Skill endpoint (`/api/skill`) and SDK (`lib/solanaAgentSkill.ts`) that functions as zero-trust preflight firewall middleware before any agent executes a transaction.

---

## ✨ Key Features

* **Natural-Language Swap Copilot:** Translates plain English trading requests (e.g., *"Swap 0.5 SOL to USDC"*) into validated token parameters and routes using Google Gemini 2.5 Flash.
* **Pre-Sign Simulation Firewall:** Inspects incoming instructions, calculates token balance differences, and computes a comprehensive Risk Score (0–100).
* **Automated Signature Lockout:** Enforces an immediate lockout on wallet approval buttons when unbounded authority delegation, drainer signatures, or anomalous slippage are flagged.
* **Jupiter V6 Aggregation:** Fetches real-time market rates and optimized liquidity routes across Solana Automated Market Makers (AMMs).
* **Cryptographic Preflight Attestation:** Generates a cryptographic audit receipt verified through Phantom Wallet (`signMessage`) to record proof-of-review.
* **Solana Agent Skill Standard:** Provides a machine-readable JSON tool manifest and audit handler enabling any Solana Agent Kit or autonomous runtime to invoke BlinkGuard as an execution guardrail.

---

## 🛠️ Tech Stack

* **Framework & Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons
* **Blockchain & Wallet:** Solana Web3.js (`@solana/web3.js`), Solana Wallet Adapter (Phantom, Solflare)
* **AI Engine:** Google GenAI SDK (`gemini-2.5-flash` with Structured JSON Schema)
* **DEX Routing:** Jupiter Aggregator API v6
* **Agent Integration:** Solana Agent Skills standard (`/api/skill`, `lib/solanaAgentSkill.ts`)
* **Deployment & RPC:** Vercel, Helius RPC

---

## 🏗️ Architecture & Execution Flow

```text
User / Agent Prompt
       │
       ▼
[/api/parse] (Gemini 2.5 Flash Structured Schema)
       │
       ├─► Threat Detected (Risk Score ≥ 80 / Drainer Vector)
       │     └─► [LOCK] Signature button disabled & malicious vector flagged
       │
       └─► Intent Benign (Risk Score < 20)
             │
             ├─► [Jupiter v6] Optimized swap route fetched
             ├─► [Simulation] Expected in/out token balance diffs confirmed
             └─► [Wallet] Phantom signs cryptographic preflight attestation receipt

🤖 Solana Agent Skill Endpoint

BlinkGuard exposes a standardized agent tool definition accessible via GET/POST at:

https://blinkguard-uoq6-six.vercel.app/api/skill
Manifest Schema (GET /api/skill)
JSON

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

Direct SDK Integration

Integrate BlinkGuard directly into autonomous agent workflows using lib/solanaAgentSkill.ts:
TypeScript

import { blinkGuardAgentSkill } from "@/lib/solanaAgentSkill";

// Run preflight audit before initiating signature prompt
const result = await blinkGuardAgentSkill.execute({
  prompt: "Swap 0.5 SOL to USDC",
  userAddress: "YourSolanaPublicKeyHere",
});

if (!result.allowed) {
  console.error("Execution blocked by BlinkGuard:", result.reason);
}

💻 Local Setup & Development
1. Clone the Repository
Bash

git clone [https://github.com/anjarkar25-max/blinkguard.git](https://github.com/anjarkar25-max/blinkguard.git)
cd blinkguard

2. Install Dependencies
Bash

npm install

3. Configure Environment Variables

Create a .env.local file in the root directory:
Code snippet

GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_HELIUS_RPC=[https://api.mainnet-beta.solana.com](https://api.mainnet-beta.solana.com)

4. Run Development Server
Bash

npm run dev

Open http://localhost:3000 to view the application locally.
🏆 Hackathon Tracks & Prize Categories

    Top 3 Overall: End-to-end security firewall with live wallet balance simulation and cryptographic attestation.

    DeFi Track Top Prize: Real-time token routing, slippage control, and automated execution powered by Jupiter v6.

    AI Track Top Prize: Structured zero-trust threat evaluation via Gemini 2.5 Flash and modular Solana Agent Skill integration.

📄 License

Distributed under the MIT License. Built for the Solana Global Hackathon (Major League Hacking).
