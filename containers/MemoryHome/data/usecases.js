export const useCases = [
  {
    slug: "trading-agents",
    name: "Trading agents",
    number: "01",
    lead: "Trading agents.",
    headline: "Strategy and decisions.",
    description:
      "Store strategy research, risk preferences and decision history. Retrieve the relevant records when your agent reviews a new market signal.",
    records: [
      ["Strategy", "Retain the original thesis"],
      ["Risk rules", "Recall your constraints"],
      ["Decisions", "Keep a verifiable record"],
    ],
    benefits: [
      [
        "Keep the strategy in view.",
        "Store research, risk preferences and execution notes under your agent’s namespace. Relevant context stays available after the session ends.",
      ],
      [
        "Recall before acting.",
        "Retrieve related observations using semantic, keyword and tag-based recall, rather than repeating the entire trading history in every prompt.",
      ],
      [
        "Review the decision trail.",
        "Persist records in content-addressed batches. Your team can retrieve the underlying bytes and check that they match the original reference.",
      ],
    ],
    steps: [
      "Record the market observation",
      "Recall the relevant strategy",
      "Persist the decision and outcome",
    ],
    note: "Memory supports your application’s decision process. A content identifier proves the integrity of a record, not the quality of a trade.",
  },
  {
    slug: "prediction-markets",
    name: "Prediction markets",
    number: "02",
    lead: "Prediction markets.",
    headline: "Evidence and forecasts.",
    description:
      "Keep sources, assumptions and forecast revisions together. Let research agents compare new evidence with earlier assessments.",
    records: [
      ["Sources", "Preserve the evidence"],
      ["Forecasts", "Retain the reasoning"],
      ["Outcomes", "Revisit what changed"],
    ],
    benefits: [
      [
        "Keep the evidence together.",
        "Write source references, timestamps and research notes alongside each forecast, so the reasoning has a record beyond one session.",
      ],
      [
        "Find related observations.",
        "Recall relevant past research through semantic and keyword matching. Use tags to organise records by event, market or research topic.",
      ],
      [
        "Learn from the review.",
        "Compare recorded assumptions with resolved outcomes. Preserve the original content so your application can revisit what informed a forecast.",
      ],
    ],
    steps: [
      "Collect evidence and sources",
      "Recall comparable observations",
      "Record the outcome for review",
    ],
    note: "Lighthouse preserves the research record. Source accuracy, forecast scoring and market actions remain part of your application.",
  },
  {
    slug: "tokenised-assets",
    name: "Tokenised assets",
    number: "03",
    lead: "Asset research.",
    headline: "Documents and updates.",
    description:
      "Link issuer updates, document versions and research notes to an asset. Give research agents a record they can retrieve for the next review.",
    records: [
      ["Research", "Keep the issuer context"],
      ["Documents", "Reference the original CID"],
      ["Updates", "Carry asset history forward"],
    ],
    benefits: [
      [
        "Retain the asset’s history.",
        "Keep issuer updates, research summaries and document references in a consistent namespace for your asset research agent.",
      ],
      [
        "Check the referenced document.",
        "Use a content identifier to verify that retrieved bytes match the document version recorded by your application.",
      ],
      [
        "Choose storage for sensitive files.",
        "Encrypted file storage and Memwal memory are separate options. Batched memory and index snapshots are unencrypted; choose the configuration for the records you store.",
      ],
    ],
    steps: [
      "Store the document reference",
      "Recall the asset’s history",
      "Verify the referenced content",
    ],
    note: "Content integrity does not establish ownership, valuation or legal validity of an asset. Those checks belong to your application.",
  },
  {
    slug: "physical-ai",
    name: "Physical AI",
    number: "04",
    lead: "Physical AI.",
    headline: "Site and device records.",
    description:
      "A proposed memory integration for robots and devices. Preserve written site knowledge and operational records across shifts and hardware changes.",
    planned: true,
    records: [
      ["Site knowledge", "Maps, dock geometry and playbooks"],
      ["Unit history", "Observations and shift decisions"],
      ["Calibration", "Offsets and maintenance records"],
    ],
    benefits: [
      [
        "Warehouse robots.",
        "The proposed integration combines shared site maps and playbooks with separate history for each unit. Stored records could be recovered after a hardware swap.",
      ],
      [
        "Inspection robots and field drones.",
        "The proposed on-device buffer holds pending observations while connectivity is unavailable. Opportunistic flush persists batches once a gateway can be reached.",
      ],
      [
        "Industrial machines and fleets.",
        "Retain calibration, tuned procedures and safety-envelope records for review after maintenance or a reset. Operators remain responsible for validating records before use.",
      ],
    ],
    steps: [
      "Buffer observations on the unit",
      "Flush when connectivity returns",
      "Recover written records by CID",
    ],
    note: "The physical AI reference integration is planned. Device buffering, reconnect behaviour and recovery need integration work. Only successfully stored records can be recovered from the network.",
  },
];
