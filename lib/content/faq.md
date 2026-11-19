# Lighthouse FAQs

Lighthouse makes two products: Lighthouse Memory (persistent memory for AI agents) and Lighthouse Storage (encrypted decentralized storage on IPFS, Filecoin and Walrus).

## Lighthouse Memory

1. **What is Lighthouse Memory?**
Persistent, verifiable long-term memory for AI agents. Agents remember, recall and forget through a hosted MCP server or a TypeScript SDK, and each memory is stored as a content-addressed blob (CID) on IPFS + Filecoin, Walrus, or your own S3-compatible bucket.

2. **Which agents does it work with?**
Any MCP-capable agent, including Claude Code, Claude Desktop and Cursor, through `https://memory-api.lighthouse.storage/mcp`. Custom agents can use the `@lighthouse-ai/*` SDK packages in Node.js.

3. **Can different agents share the same memory?**
Yes. Agents connected to the same account and namespace read and write the same memory, so context saved in one tool can be recalled in another.

4. **Are my memories encrypted?**
Not by default. Without encryption, new memories are stored as plain JSON, and on Lighthouse Storage anyone with a memory's CID can read it. Turn on encryption in the dashboard and every new memory and the search index are encrypted with a key for your account alone. The key is split across 5 key servers (any 3 rebuild it) and memories are decrypted only inside a Phala enclave. Memories saved before you turn it on stay unencrypted, so turn it on before your first memory if you need everything private.

5. **Does recall still work with encryption on?**
Yes. Search runs inside the enclave, so your agents recall encrypted memories exactly as before.

6. **Does forget delete my data?**
It depends on the backend. On your own bucket or a local folder, forget is a hard delete. On Lighthouse Storage, forget stops the memory's storage renewal, but copies already on public IPFS may remain. On Memwal, forget removes the local copy and unpins, and the encrypted blob lapses on its own.

7. **What does "verifiable" mean?**
Every stored memory batch has a CID derived from its bytes. If anything changes, the CID changes, so you can prove a recalled memory is exactly what was saved. A CID proves integrity, not that the memory's content is true.

8. **Can I restore memory on a new machine?**
Yes. Rebuild the search index from the network, or restore a full memory store from a single snapshot CID tracked by the pointer service.

9. **Can I keep memories in my own storage?**
Yes. Connect an Amazon S3, Cloudflare R2, Supabase or MinIO bucket from the dashboard and memories and the search index are stored there. Your MCP setup doesn't change.

10. **Does semantic search send my data to a third party?**
Not with the batched engine. It uses a local MiniLM embedding model, combining similarity with keyword and tag matching, so nothing leaves the machine for embedding. The Memwal engine searches on its relayer over encrypted blobs.

11. **How many memories can I store?**
New accounts get 10,000 memories free for a 14-day trial, starting from the first memory. Lite plans include 25,000, Pro 50,000 and Premium 100,000, with priority support on Premium. Allowances from all active paid plans are pooled, and deleting a memory frees its slot.

12. **What should I not store in Memory?**
Passwords, API keys and other secrets, unless encryption is on. Without encryption, memories on public IPFS can be read by anyone with the CID.

13. **How is it different from Mem0, Zep or Letta?**
Mem0 focuses on automatically extracting what to remember, Zep on temporal knowledge graphs, and Letta is a full agent runtime. Lighthouse Memory focuses on where memory lives and who can verify it: portable, content-addressed memory that any MCP agent can share, on decentralized storage or your own bucket, with optional enclave-based encryption.

## Lighthouse Storage

14. **What is Lighthouse Storage?**
Lighthouse's encrypted decentralized storage product. One API, SDK and app store files across IPFS, Filecoin and Walrus, with client-side encryption and token-gated access. It is also where Lighthouse Memory stores memories by default.

15. **How long will data be stored on Lighthouse?**
Your data remains stored while your Lighthouse plan is active and within the limits of the selected provider plan. Filecoin plans can be billed monthly or annually, and Walrus plans are currently billed monthly.

16. **Can I upload private/sensitive data to Lighthouse?**
Yes, but sensitive data should be encrypted before upload. Lighthouse provides encryption and access-control features where available, and add-on availability may vary by storage provider.

17. **Can I edit/delete files uploaded to Lighthouse?**
Files can be removed from Lighthouse-managed storage where supported. Because IPFS uses content-addressed data and decentralized nodes may cache public files, deletion cannot guarantee that every third-party copy disappears. For workflows that need updates, use mutable references such as IPNS.

18. **How is it different from IPFS and Filecoin?**
IPFS provides content addressing and peer-to-peer data distribution, while Filecoin adds paid storage deals on top of IPFS. Lighthouse simplifies that stack by giving you an app, SDK, CLI, gateways, billing, and optional add-ons for storing data on providers such as Filecoin and Walrus without managing storage deals directly.

19. **Which chains does it support?**
You can build on any network and store your data on Lighthouse. Lighthouse is chain agnostic, so your storage workflow does not need to be tied to a specific chain.
