# 🛡️ BlinkGuard
> Pre-Sign AI Transaction Firewall & Natural-Language Copilot on Solana

BlinkGuard bridges conversational DeFi execution and proactive wallet security. By simulating transaction balance diffs and running real-time heuristic threat detection via **Gemini 2.5 Flash**, BlinkGuard intercepts malicious drainers, token authority theft, and phishing blind-signs before any transaction reaches the wallet.

---

## 💡 The Problem
- **Blind Signing**: Millions of dollars are lost monthly across Solana to unbounded token delegation and wallet drainer scripts disguised as legitimate dApps.
- **DeFi Friction**: Fragmented swap aggregators and complex slippage/route settings create high barriers for everyday users.

## 🚀 Key Features
- **Natural-Language Copilot**: Parses plain English swap instructions (`"Swap 0.5 SOL to USDC"`) into optimal routing parameters using Gemini 2.5 Flash structured outputs.
- **Pre-Sign Simulation Firewall**: Analyzes incoming instructions, detects balance drains, and assigns a calibrated risk score (0–100).
- **Automated Threat Interception**: Flags high-risk vectors (e.g., unbounded transfer delegates, drainer contracts) and locks the signature button to prevent asset loss.
- **Jupiter v6 Aggregation**: Fetches real-time market rates and route information directly on Solana.
- **Cryptographic Wallet Attestation**: Signs verified pre-execution audit receipts natively via Phantom Wallet.

---

## 🛠️ Tech Stack
- **Frontend / Framework**: Next.js (App Router), React, Tailwind CSS, Lucide Icons
- **Blockchain & Wallet**: Solana Web3.js (`@solana/web3.js`), Solana Wallet Adapter, Phantom
- **AI Engine**: Google GenAI SDK (`gemini-2.5-flash` with Structured Outputs)
- **DeFi Routing**: Jupiter Aggregator API v6
- **RPC Infrastructure**: Helius / Solana Devnet

---

## 🏗️ Architecture Flow

1. **User Input**: User submits a command or selects a test scenario (e.g., Safe Swap vs. Malicious Drainer Phish).
2. **AI Intent & Threat Audit**: Next.js API route passes the intent to Gemini 2.5 Flash, generating a structured assessment (`isMalicious`, `threatReason`, `amount`, `action`).
3. **Route & Rate Fetching**: If benign, the route fetches live swap quotes from Jupiter Aggregator v6. If malicious, the engine triggers a threat lock (`Risk Score: 99/100`).
4. **Client Verification**: The user reviews the audited summary, inflows, and outflows.
5. **Cryptographic Attestation**: The user approves and signs the audit receipt using Phantom Wallet.

---

## ⚙️ Quickstart

### 1. Clone the Repository
```bash
git clone [https://github.com/anjarkar25-max/blinkguard.git](https://github.com/anjarkar25-max/blinkguard.git)
cd blinkguard
