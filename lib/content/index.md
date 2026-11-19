# Lighthouse

Lighthouse makes two products: **Lighthouse Memory**, persistent memory for AI agents, and **Lighthouse Storage**, encrypted decentralized storage on IPFS, Filecoin and Walrus.

## Lighthouse Memory

Give every agent a persistent brain.

Lighthouse Memory is persistent, verifiable long-term memory for AI agents. Save project context, preferences and decisions once, then recall what matters in the next session, on another machine, or in a different agent. It works through a hosted MCP server or a TypeScript SDK, and every memory is stored as a content-addressed blob (CID) on decentralized storage.

- Try it: https://memory.lighthouse.storage
- Quick start: https://docs.lighthouse.storage/memory/quick-start
- MCP endpoint: https://memory-api.lighthouse.storage/mcp

Backed by Balaji Srinivasan, Protocol Labs, Big Brain Holdings, LongHash Ventures, Fenbushi Capital, NGC Ventures, Walrus Foundation, Mask Network and HASH CIB.

## What is Lighthouse Memory?

Lighthouse Memory gives AI agents durable, portable memory. Agents use three tools: remember, recall and forget. Memories live on the network, not inside one app or chat session, so any connected agent can pick up where another left off, and a full memory store can be restored on a new machine from a single snapshot CID.

## Different minds. Shared memory.

Connected agents use the same saved context. Save something in Claude, then recall it in Codex, Cursor or your own agent. Each application connects once, through MCP or the SDK.

How shared memory works:

1. **Connect** a supported client to the MCP endpoint, or add the SDK to your app.
2. **Remember** the records you choose: preferences, project state, decisions, files.
3. **Continue** in any connected agent, which recalls the relevant records when it needs them.

## Add memory to your application

Three ways to start:

- **MCP connection.** Point any MCP client (Claude Code, Claude Desktop, Cursor and others) at `https://memory-api.lighthouse.storage/mcp`. Tools include `memory_remember`, `memory_recall`, `memory_list`, `memory_get`, `memory_forget` and `memory_status`. Guide: https://docs.lighthouse.storage/memory/mcp/overview
- **Memory SDK.** Compose the `@lighthouse-ai/*` packages in Node.js: pick an engine, a storage backend and an embedder. Guide: https://docs.lighthouse.storage/memory/quick-start
- **Encrypted memory.** Turn on encryption in the dashboard, or use the Memwal engine for SEAL-encrypted memory on Walrus. Guide: https://docs.lighthouse.storage/memory/tutorials/dashboard-encryption

```js
import '@lighthouse-ai/store-lighthouse'
import '@lighthouse-ai/embed-local'
import { createStorage, createEmbedder } from '@lighthouse-ai/core'
import { BatchedEngine } from '@lighthouse-ai/engine-batched'

const memory = new BatchedEngine(
  await createStorage('lh-ipfs-filecoin', { apiKey: process.env.LIGHTHOUSE_API_KEY }),
  { namespace: 'my-agent', embedder: await createEmbedder('local') }
)

await memory.remember('Our project uses TypeScript.', { tags: ['project'] })
await memory.flush()
const context = await memory.recall('What language do we use?')
```

This example stores public, unencrypted memory. Turn on encryption for anything private.

## Storage, verification and control

- **Memory.** Keep project facts, preferences and decisions outside the conversation. Your agent searches them and adds the relevant ones to a later request.
- **Proof.** Every stored memory batch has a content identifier (CID). Check that what you retrieve matches what you saved. A CID proves integrity, not that a statement is true.
- **Control.** You decide what to save, which agent sees which records, and where they are stored: Lighthouse Storage on IPFS + Filecoin, Walrus, or your own S3-compatible bucket. Tags and namespaces organise context.

## Use cases

- **Trading agents:** keep strategy, risk limits and past execution in context. https://www.lighthouse.storage/use-cases/trading-agents
- **Prediction markets:** carry earlier research and assessments into the next decision. https://www.lighthouse.storage/use-cases/prediction-markets
- **Tokenised assets:** connect assets with their history. https://www.lighthouse.storage/use-cases/tokenised-assets
- **Physical AI:** memory that outlives a single machine. https://www.lighthouse.storage/use-cases/physical-ai

## The network in numbers

- 34,000+ builders on Lighthouse
- 50 TiB+ storage consumed

Trusted by Artificial Superintelligence Alliance, Eternal AI, SingularityNET, TopAI Network, Open Bagel, Nuklai and Walrus Memory.

## FAQs

1. **What do you mean by a persistent brain?**
Your agent's memory lives outside any single chat or app. Facts, preferences and decisions you save are still there next session, on a new machine, or in another agent.

2. **How do I connect an agent?**
Add `https://memory-api.lighthouse.storage/mcp` to any MCP client, such as Claude Code, Claude Desktop or Cursor, or install the `@lighthouse-ai/*` SDK packages in your app. Each application connects once.

3. **Can different agents share memory?**
Yes. Every agent connected to the same account and namespace reads and writes the same memory, so context carries from one tool to another.

4. **Is every memory encrypted?**
Not by default. New memories are stored as plain JSON on public IPFS unless you turn on encryption in the dashboard. With encryption on, each memory is encrypted with a key for your account alone, split across 5 key servers and opened only inside a Phala enclave. Search still works. The Memwal engine stores SEAL-encrypted memory on Walrus.

5. **What does verifiable memory mean?**
Each stored memory batch has a CID derived from its content. If the content changes, the CID changes, so you can check that what you recall is exactly what was saved.

6. **Does forgetting a memory erase the stored data?**
It depends on where it is stored. On your own S3-compatible bucket or a local folder, forget is a hard delete. On Lighthouse Storage, forget stops the memory's storage renewal, but copies already on public IPFS may remain, so turn on encryption before saving anything private. On Memwal, forget removes the local copy and unpins; the encrypted blob lapses on its own.

7. **How much does it cost?**
New accounts get 10,000 memories free for a 14-day trial, starting from the first memory. Paid plans include 25,000 (Lite), 50,000 (Pro) or 100,000 (Premium) memories. See https://www.lighthouse.storage/pricing.md

## Lighthouse Storage

Store your data securely and reliably. Lighthouse Storage is encrypted decentralized storage for individuals, developers and enterprises: one API and SDK that route files across IPFS, Filecoin and Walrus, with client-side encryption and token-gated access. It is also the default home for Lighthouse Memory.

- Overview: https://www.lighthouse.storage/storage
- Docs: https://docs.lighthouse.storage
- App: https://files.lighthouse.storage

### Web application
Store, retrieve and share files on IPFS, Filecoin and Walrus from https://files.lighthouse.storage. Log in with social login or a wallet, share by public link or keep files encrypted behind token and NFT ownership, and pay by card or on-chain on monthly or annual plans.

### SDK and CLI
Libraries, APIs and a command-line tool to integrate Lighthouse Storage in JavaScript, Node, Python and Go. https://docs.lighthouse.storage/

### Encryption SDK and token gating
Kavach encrypts files client-side with BLS threshold cryptography, and access can be gated on EVM, Solana and Cosmos signatures, passkeys and zkTLS. https://docs.lighthouse.storage/how-to/encryption-features

### Also included
- Long-term storage on IPFS with Filecoin and Walrus underneath
- Dedicated IPFS gateways for fast retrieval, including 4K video
- Image resizing at retrieval time
- S3-compatible API (L3) at https://s3.lighthouse.storage

## Links

- Memory dashboard: https://memory.lighthouse.storage
- Memory docs: https://docs.lighthouse.storage/memory/intro
- Lighthouse Storage: https://www.lighthouse.storage/storage
- Storage docs: https://docs.lighthouse.storage
- Pricing: https://www.lighthouse.storage/pricing
- Blog: https://www.lighthouse.storage/blogs
- X: https://x.com/LighthouseWeb3
- Discord: https://discord.com/invite/c4a4CGCdJG
- Contact: mail@lighthouse.storage
