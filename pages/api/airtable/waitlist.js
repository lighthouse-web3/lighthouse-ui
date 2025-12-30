const AIRTABLE_API_BASE = "https://api.airtable.com/v0";
const AIRTABLE_META_BASE = "https://api.airtable.com/v0/meta";

const buildHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const createRecord = async ({ token, baseId, tableName, fields }) => {
  const response = await fetch(
    `${AIRTABLE_API_BASE}/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify({ records: [{ fields }] }),
    }
  );

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
};

const createTable = async ({ token, baseId, tableName }) => {
  const response = await fetch(`${AIRTABLE_META_BASE}/bases/${baseId}/tables`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify({
      name: tableName,
      fields: [
        { name: "Email", type: "email" },
        { name: "Wallet Address", type: "singleLineText" },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, address } = req.body || {};
  if (!email || !address) {
    return res.status(400).json({ error: "Missing email or wallet address" });
  }

  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = "appbK8PzfeMm5g3gr";
  const tableName = "Table 1";

  if (!baseId) {
    return res.status(500).json({ error: "Missing Airtable base ID" });
  }

  const recordResult = await createRecord({
    token,
    baseId,
    tableName,
    fields: {
      Email: email,
      "Wallet Address": address,
    },
  });

  if (recordResult.ok) {
    return res.status(200).json(recordResult.data);
  }

  if (recordResult.status === 404) {
    const tableResult = await createTable({ token, baseId, tableName });
    if (!tableResult.ok) {
      return res.status(500).json({
        error: "Failed to create Airtable table",
        details: tableResult.data,
      });
    }

    const retryResult = await createRecord({
      token,
      baseId,
      tableName,
      fields: {
        Email: email,
        "Wallet Address": address,
      },
    });

    if (retryResult.ok) {
      return res.status(200).json(retryResult.data);
    }

    return res.status(500).json({
      error: "Failed to store waitlist entry after creating table",
      details: retryResult.data,
    });
  }

  return res.status(500).json({
    error: "Failed to store waitlist entry",
    details: recordResult.data,
  });
}
