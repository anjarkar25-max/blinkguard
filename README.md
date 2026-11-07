# 🛡️ BlinkGuard

> **Autonomous Pre-Sign AI Firewall & Intent-Driven Trading Copilot for Solana**  
> Active preflight security middleware protecting users and autonomous agents from wallet drainers, blind signing, and malicious authority delegations.

---

## 🚀 Overview

**BlinkGuard** provides real-time, pre-execution threat analysis and intent routing on the Solana blockchain. By integrating Google Gemini 2.5 Flash threat simulation with Jupiter Aggregator v6, BlinkGuard inspects and scores transaction instructions *before* Phantom or Solana wallet prompts request a signature.

It exposes a standard **Solana Agent Skill** endpoint (`/api/skill`), allowing autonomous trading bots, LangChain agents, and ElizaOS swarms to verify transactions before submitting on-chain.

- **Live Deployment:** [blinkguard-uoq6-six.vercel.app](https://blinkguard-uoq6-six.vercel.app)
- **Agent Skill Endpoint:** [blinkguard-uoq6-six.vercel.app/api/skill](https://blinkguard-uoq6-six.vercel.app/api/skill)
- **Video Walkthrough:** [YouTube Demo](https://youtu.be/ZmDDf0jS_j4)

---

## ⚡ Core Architecture & Features

### 1. Natural-Language Intent Engine
* Accepts plain-text trading requests (e.g., *"Swap 0.1 SOL to USDC"* or *"Claim free airdrop tokens"*).
* Resolves standard SPL mints (`SOL`, `USDC`, `USDT`, `BONK`, `JUP`) and queries Jupiter V6 API for live execution routes.

### 2. Pre-Sign AI Threat Firewall
* Audits intent strings and instruction payloads against known threat vectors:
  * Drainer heuristic patterns (`claim free`, `delegation`, `unbounded approval`).
  * Slippage and anomalous quote parameters.
* Outputs a granular **Risk Score (0–100)**, an execution verdict (`SAFE`, `CAUTION`, `BLOCKED`), and human-readable risk notes.

### 3. Signature Lock & Attestation
* **Signature Lockdown:** Blocks wallet execution automatically when high risk (>70) is detected.
* **Cryptographic Attestation:** Safe transactions request a preflight attestation signature via Phantom Wallet (`signMessage`) to log proof-of-review.

### 4. Solana Agent Skills Standard Middleware
* Complies with autonomous agent tool calling standards via `/api/skill`.
* Allows AI agents and automated swarms to verify intents programmatically via HTTP `POST` before constructing raw transactions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), React, Tailwind CSS |
| **Blockchain** | Solana Web3.js, Solana Wallet Adapter |
| **DEX Aggregation** | Jupiter Swap API v6 |
| **AI Threat Engine** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Agent Middleware** | Solana Agent Skills Standard (`/api/skill`, `lib/solanaAgentSkill.ts`) |
| **Deployment** | Vercel, Helius RPC |

---

## 🔌 Solana Agent Skill Specification

Autonomous agents can invoke BlinkGuard directly:

**Endpoint:** `POST https://blinkguard-uoq6-six.vercel.app/api/skill`

### Request Payload
```json
{
  "prompt": "Swap 0.5 SOL to USDC with 1% slippage",
  "userAddress": "YourSolanaPublicKeyHere"
}
