# 🛡️ BlinkGuard

> **Pre-Sign AI Transaction Firewall & Natural-Language Trading Copilot on Solana**  
> *Built for the Solana Global Hackathon (Major League Hacking)*

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://blinkguard-uoq6-six.vercel.app)
[![API Skill](https://img.shields.io/badge/Agent_Skill-Endpoint-purple?style=for-the-badge&logo=fastapi)](https://blinkguard-uoq6-six.vercel.app/api/skill)
[![Video Walkthrough](https://img.shields.io/badge/YouTube-Demo_Video-red?style=for-the-badge&logo=youtube)](https://youtu.be/ZmDDf0jS_j4)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ⚡ The Problem

1. **Blind Signing & Phishing Drainers:** Users frequently authorize malicious token delegations, illicit escrow instructions, or fake airdrops because standard wallet approval popups fail to decode complex contract bytecode.
2. **Autonomous Agent Security Blindspots:** Autonomous AI trading agents on Solana lack standardized, out-of-band execution guardrails, making them prime targets for prompt injections and manipulated routing.
3. **DeFi Execution Friction:** Navigating decentralized exchanges, slippage tolerances, and raw token mints presents a steep barrier for regular users.

---

## 💡 Solution: What is BlinkGuard?

BlinkGuard provides an active, two-sided defensive layer on Solana:

* **For End Users:** A natural-language DeFi swap copilot that simulates transactions, calculates risk scores (0–100), and actively locks wallet signature triggers whenever drainer heuristics are detected.
* **For Autonomous AI Agents:** A standardized Solana Agent Skill endpoint (`/api/skill`) and SDK (`lib/solanaAgentSkill.ts`) operating as preflight firewall middleware before any agent signs an on-chain payload.

---

## ✨ Key Features

* **Natural-Language Swap Copilot:** Translates plain English intents (e.g., *"Swap 0.5 SOL to USDC"*) into validated token parameters and routes using Google Gemini 2.5 Flash.
* **Pre-Sign Simulation Firewall:** Analyzes proposed instructions, calculates simulated token balance diffs, and computes a comprehensive Risk Score (0–100).
* **Automated Signature Lockout:** Dynamically disables wallet approval actions when unbounded authority delegation, drainer patterns, or excessive slippage are detected.
* **Jupiter V6 Aggregation:** Fetches real-time market rates and optimized liquidity routes across Solana AMMs.
* **Cryptographic Attestation:** Emits a cryptographic pre-execution audit receipt verified through Phantom Wallet (`signMessage`).
* **Solana Agent Skill Standard:** Provides a machine-readable JSON tool manifest and audit handler enabling any Solana Agent Kit or autonomous runtime to call BlinkGuard as an execution guardrail.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend & UI** | Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons |
| **Blockchain & Wallet** | Solana Web3.js (`@solana/web3.js`), Solana Wallet Adapter (Phantom, Solflare) |
| **AI Threat Engine** | Google GenAI SDK (`gemini-2.5-flash` with Structured Outputs) |
| **DEX Liquidity** | Jupiter Aggregator API v6 |
| **Agent Middleware** | Solana Agent Skills Standard (`/api/skill`, `lib/solanaAgentSkill.ts`) |
| **Deployment & RPC** | Vercel, Helius RPC |

---

## 🏗️ Architecture & Execution Flow

```text
User / Agent Prompt
       │
       ▼
[/api/parse] (Gemini 2.5 Flash Threat Engine)
       │
       ├─► Threat Detected (Risk Score ≥ 80)
       │     └─► [LOCK] Signature disabled & drainer vector flagged
       │
       └─► Intent Benign (Risk Score < 20)
             │
             ├─► [Jupiter v6] Optimized swap route fetched
             ├─► [Simulation] Expected in/out balances confirmed
             └─► [Wallet] Phantom signs preflight attestation receipt

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

Integrate BlinkGuard into an agent swarm using lib/solanaAgentSkill.ts:
TypeScript

import { blinkGuardAgentSkill } from "@/lib/solanaAgentSkill";

// Execute preflight audit before signing
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

Open http://localhost:3000 to inspect the interface locally.
🏆 Hackathon Tracks & Prize Categories

    Top 3 Overall: Complete, deployed end-to-end security firewall with live wallet signing.

    DeFi Track Top Prize: Real-time token routing, slippage control, and quote verification powered by Jupiter v6.

    AI Track Top Prize: Dynamic structured threat evaluation via Gemini 2.5 Flash and modular Solana Agent Skill integration.

📄 License

MIT License. Built for the MLH Solana Hackathon
