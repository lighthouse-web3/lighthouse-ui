export const usecaseDetails = {
  "trading-agents": {
    title:
      "Record the research, retrieve the strategy, then review the decision.",
    intro:
      "A trading agent needs more than the latest signal. Save the strategy, constraints and previous reviews so the application can retrieve them before proposing an action.",
    prompt: "Review this new market signal against our existing strategy.",
    memories: [
      [
        "Strategy thesis",
        "Record the conditions that would support or invalidate the idea.",
      ],
      [
        "Risk preferences",
        "Keep the user’s exposure limits and approval requirements.",
      ],
      [
        "Previous review",
        "Recall why a similar signal was rejected last session.",
      ],
    ],
    response:
      "The new signal resembles one reviewed earlier. Retrieve the original thesis and risk constraints, compare what has changed, and prepare a review before any execution.",
    problems: [
      [
        "The strategy gets lost",
        "A restarted agent sees a signal without the assumptions that originally made it relevant.",
      ],
      [
        "Constraints get repeated",
        "Risk preferences and review requirements have to be supplied again in every session.",
      ],
      [
        "Decisions lose their context",
        "An execution record alone does not explain which research, assumptions or instructions informed it.",
      ],
    ],
    features: [
      [
        "Retain the strategy",
        "Save the thesis, research and conditions that would invalidate it. Retrieve these records before the agent proposes its next action.",
        "STRATEGY MEMORY",
        ["Thesis", "Entry conditions", "Invalidation criteria"],
      ],
      [
        "Retrieve relevant records",
        "Search saved observations by meaning, keywords or tags. Your application chooses which results to include in the next request.",
        "TARGETED RECALL",
        ["Query", "Strategy tags", "Related observations"],
      ],
      [
        "Record the decision",
        "Store inputs, reasoning and outcomes as separate records. Content identifiers let reviewers check the saved version.",
        "DECISION HISTORY",
        ["Observation", "Rationale", "Outcome"],
      ],
      [
        "Keep review steps in the application",
        "Store risk preferences and approval requirements as context. Your application must enforce limits and approve or reject actions.",
        "WORKFLOW CONTINUITY",
        ["Research agent", "Review agent", "Execution notes"],
      ],
    ],
    workflow: [
      [
        "Capture the observation",
        "Write the signal, source reference, timestamp and strategy tags.",
      ],
      [
        "Recall before reviewing",
        "Retrieve related research, constraints and prior decisions for the application to evaluate.",
      ],
      [
        "Record what happened",
        "Persist the chosen action or rejection, its rationale and the eventual outcome.",
      ],
    ],
    build: [
      "Define a namespace for each strategy or account context.",
      "Tag records by instrument, strategy and event type.",
      "Keep execution permissions and risk checks in the trading application.",
      "Keep source references and timestamps alongside generated summaries.",
    ],
    faqs: [
      [
        "Does Lighthouse execute trades?",
        "This use case describes memory infrastructure. Signal generation, risk validation, approvals and order execution belong to the trading application.",
      ],
      [
        "Does memory guarantee better returns?",
        "No. Memory can preserve relevant context and make decisions easier to review. It does not establish that a strategy or market observation is correct.",
      ],
      [
        "What should the agent remember?",
        "Useful examples include the original thesis, risk preferences, source references, decisions and outcomes. Your application chooses which records to write and recall.",
      ],
      [
        "What can a reviewer verify?",
        "A content identifier can help verify that retrieved bytes match the recorded batch. It does not prove the accuracy of the research or the quality of the decision.",
      ],
    ],
    cta: "Add memory to a trading workflow.",
  },
  "prediction-markets": {
    title: "Save the evidence, revisit the forecast, then record the outcome.",
    intro:
      "Store the sources and assumptions behind each forecast. A research agent can retrieve them when new evidence arrives and record why the assessment changed.",
    prompt:
      "New evidence has arrived. What should we revisit in this forecast?",
    memories: [
      [
        "Original assumption",
        "The forecast relied on a particular event occurring before the deadline.",
      ],
      [
        "Source record",
        "Keep the publication date and reference behind that assumption.",
      ],
      [
        "Previous revision",
        "Record which evidence changed the last assessment.",
      ],
    ],
    response:
      "Retrieve the original assumption and the earlier revision. Compare the new source against both, identify what is no longer supported, and record a fresh assessment with its reasoning.",
    problems: [
      [
        "Forecasts become isolated answers",
        "A probability without its assumptions is hard to revisit when new evidence appears.",
      ],
      [
        "Sources get separated from claims",
        "Research notes spread across sessions, making the origin and age of an observation difficult to follow.",
      ],
      [
        "Resolved outcomes go unused",
        "Without a recorded history, teams cannot easily compare what they expected with what actually happened.",
      ],
    ],
    features: [
      [
        "Keep evidence with its source",
        "Save source references, publication dates and research notes. Retrieve the evidence behind a forecast during the next review.",
        "EVIDENCE RECORD",
        ["Source reference", "Observed at", "Research notes"],
      ],
      [
        "Record the assumptions",
        "Write the conditions supporting a forecast. Retrieve them when a new observation may change the assessment.",
        "ASSUMPTION MEMORY",
        ["Original premise", "New evidence", "Revised reasoning"],
      ],
      [
        "Track forecast revisions",
        "Save each assessment with a timestamp and explanation. Compare revisions while retaining earlier records.",
        "FORECAST HISTORY",
        ["Initial assessment", "Revision", "Resolution"],
      ],
      [
        "Review resolved outcomes",
        "Link the result to earlier assumptions and evidence. Your application handles scoring and decides what to use in future research.",
        "OUTCOME REVIEW",
        ["Forecast", "Actual outcome", "Review notes"],
      ],
    ],
    workflow: [
      [
        "Write the evidence",
        "Record source references, timestamps, market tags and the assumptions they inform.",
      ],
      [
        "Recall before revising",
        "Retrieve related evidence and previous assessments when new information arrives.",
      ],
      [
        "Close the review loop",
        "Record the resolved outcome and review it against the research history.",
      ],
    ],
    build: [
      "Choose an event or market identifier that stays consistent across sessions.",
      "Store observations separately from the agent’s interpretation.",
      "Timestamp each forecast and record the resolution criteria.",
      "Implement forecast scoring and market actions in your own application.",
    ],
    faqs: [
      [
        "Does Lighthouse predict market outcomes?",
        "No. It provides a way to persist and recall the research context your forecasting application uses. The model and application produce the assessment.",
      ],
      [
        "Can it check whether a source is true?",
        "A stored reference helps trace a claim back to its source. Evaluating source reliability and factual accuracy remains part of the research workflow.",
      ],
      [
        "How do we organise related markets?",
        "Your application can use namespaces and tags to organise records by event, market or topic, then query the relevant context.",
      ],
      [
        "Can we review earlier forecasts?",
        "Persist the forecast, timestamp, rationale and source references. Your application can retrieve these records alongside the resolved outcome for comparison.",
      ],
    ],
    cta: "Set up memory for forecasting research.",
  },
  "tokenised-assets": {
    title:
      "Reference the document, retrieve the earlier review, then record the update.",
    intro:
      "Give each asset a research history: document references, issuer updates and review notes. Keep the version used in a decision available for later comparison.",
    prompt:
      "An issuer has published an update. What has changed since our last review?",
    memories: [
      [
        "Previous document",
        "Keep the content identifier of the version used in the last review.",
      ],
      [
        "Research notes",
        "Record the assumptions and open questions from that review.",
      ],
      [
        "Asset context",
        "Link the issuer reference and document history to the asset identifier.",
      ],
    ],
    response:
      "Retrieve the earlier document reference and open questions. Compare them with the new update, preserve both versions, and prepare a review of the changes that matter.",
    problems: [
      [
        "Documents lose their version",
        "An updated link can point to different content from the document an earlier decision relied on.",
      ],
      [
        "Research starts from scratch",
        "A new session has the asset identifier but not the issuer context or unresolved questions.",
      ],
      [
        "File access and memory get confused",
        "Sensitive source files need explicit access handling, separate from the summaries and references used by an agent.",
      ],
    ],
    features: [
      [
        "Reference exact document versions",
        "Save the content identifier of the document used in a review. Later, retrieve it and check that the bytes match the reference.",
        "DOCUMENT REFERENCES",
        ["Asset ID", "Document CID", "Review date"],
      ],
      [
        "Retain issuer research",
        "Save research notes, source references and open questions. Retrieve the relevant records when the next review begins.",
        "ISSUER MEMORY",
        ["Issuer updates", "Research notes", "Open questions"],
      ],
      [
        "Link updates to earlier records",
        "Add new records with consistent asset identifiers and tags. Compare an update with the document history and previous reviews.",
        "ASSET HISTORY",
        ["Earlier version", "New update", "Change review"],
      ],
      [
        "Choose the right storage for sensitive data",
        "Encrypted file storage protects source documents. For memory, Memwal uses SEAL-encrypted Walrus blobs; batched memory and index snapshots are unencrypted. Optional IPFS mirrors are public.",
        "DATA HANDLING",
        ["Source documents", "Memory backend", "Mirror settings"],
      ],
    ],
    workflow: [
      [
        "Reference the source document",
        "Store the document and keep its CID with the asset identifier and review timestamp.",
      ],
      [
        "Recall the previous review",
        "Retrieve relevant issuer notes, document references and unresolved questions.",
      ],
      [
        "Preserve the new context",
        "Write the updated assessment while retaining the references behind earlier decisions.",
      ],
    ],
    build: [
      "Use a stable asset identifier in your record tags.",
      "Retain the exact document version behind each review.",
      "Separate file access decisions from the context passed to the model.",
      "Keep ownership, valuation and compliance checks in the application.",
    ],
    faqs: [
      [
        "Does a CID prove ownership of an asset?",
        "No. A CID identifies content. It does not establish legal title, valuation, authenticity of an issuer or rights attached to a token.",
      ],
      [
        "Can we keep earlier document versions?",
        "Your workflow can store each version and retain its content identifier. Keeping those references lets your application retrieve the document used in an earlier review.",
      ],
      [
        "Are files and memory encrypted in the same way?",
        "No. File encryption and memory encryption are separate configurations. Memwal encrypts Walrus blobs, while optional IPFS mirrors and index snapshots remain unencrypted. Batched memory is also unencrypted by default. Check the selected storage path before saving sensitive data.",
      ],
      [
        "What belongs in an asset research memory?",
        "Examples include issuer notes, source references, document CIDs, review timestamps, updates and open questions. Choose records that support the next review.",
      ],
    ],
    cta: "Set up memory for asset research.",
  },
  "physical-ai": {
    title:
      "Buffer locally, write when connected, then recover and validate the records.",
    intro:
      "The proposed integration separates shared site records from each device’s observations. It covers local buffering, network writes and recovery for operator review.",
    prompt:
      "A replacement unit is joining the next shift. What context should it recover?",
    memories: [
      [
        "Site knowledge",
        "Maps, dock geometry and operational playbooks associated with the site.",
      ],
      [
        "Unit history",
        "Observations and shift decisions written by the previous unit.",
      ],
      [
        "Calibration record",
        "The model identity, offsets and maintenance history relevant to review.",
      ],
    ],
    response:
      "In the proposed workflow, recover the written site and unit records. The operator validates the applicable maps, calibration and safety settings before the replacement unit resumes work.",
    problems: [
      [
        "Knowledge stays on one machine",
        "A reset or hardware replacement can separate the next unit from the context accumulated by its predecessor.",
      ],
      [
        "Connectivity is intermittent",
        "Robots and field devices need a way to retain pending observations when the network is unavailable.",
      ],
      [
        "Site and unit history get mixed",
        "A shared map and one robot’s shift observations need different scopes and update rules.",
      ],
    ],
    features: [
      [
        "Separate shared site records",
        "The proposed design keeps maps and operating instructions separate from device observations. Shared records stay associated with their site.",
        "SITE MEMORY",
        ["Maps", "Dock geometry", "Playbooks"],
      ],
      [
        "Retain device history",
        "Save observations and shift records for each unit. A replacement could recover successfully written records for operator review.",
        "UNIT MEMORY",
        ["Observations", "Shift decisions", "Recovery references"],
      ],
      [
        "Buffer while offline",
        "The planned integration holds pending records on the device, then writes batches when a gateway becomes reachable.",
        "PROPOSED OFFLINE FLOW",
        ["Local buffer", "Connectivity returns", "Batch + CID"],
      ],
      [
        "Keep operational records for review",
        "Save model identity, calibration notes and maintenance history. Operators must validate recovered records before using them.",
        "REVIEW CONTEXT",
        ["Model identity", "Calibration", "Incident history"],
      ],
    ],
    workflow: [
      [
        "Buffer on the device",
        "In the proposed integration, hold pending observations locally while the device is disconnected.",
      ],
      [
        "Flush when connected",
        "Persist incremental batches when a gateway is reachable and retain the returned CIDs.",
      ],
      [
        "Recover and validate",
        "Retrieve written records using the namespace credential; validate their suitability before operational use.",
      ],
    ],
    build: [
      "Separate shared site records from unit-specific observations.",
      "Keep model identity explicit for procedural and calibration records.",
      "Plan local buffering, power-loss handling and reconnect behaviour.",
      "Validate recovered records in the robot application before use.",
    ],
    faqs: [
      [
        "Is the physical-AI integration available today?",
        "The physical-AI reference integration is planned. On-device buffering, opportunistic flush and site-versus-unit namespaces still require integration work.",
      ],
      [
        "Does this replace a robot’s control or safety system?",
        "No. The proposed memory path persists and recovers context. Real-time control, safety enforcement and validation of recovered records remain responsibilities of the device and operator.",
      ],
      [
        "What happens while a robot is offline?",
        "The proposed design buffers pending observations on the device and flushes them when connectivity returns. Local buffering needs its own implementation and durability considerations.",
      ],
      [
        "Can a replacement recover every recent observation?",
        "Recovery covers records that were successfully written to the network. Observations remaining only in a local pending buffer require a separate recovery path.",
      ],
    ],
    cta: "Discuss a physical AI integration.",
  },
};
