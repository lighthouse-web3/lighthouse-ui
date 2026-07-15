const BLOG_INDEX_PATH = "/blogs";

function getSecret(req) {
  return req.query.secret || req.headers["x-revalidate-secret"];
}

function addPath(paths, path) {
  if (typeof path !== "string" || !path.startsWith("/")) return;
  paths.add(path);
}

function addBlogTitle(paths, title) {
  if (typeof title !== "string" || !title.trim()) return;
  paths.add(`/blogs/${encodeURIComponent(title.trim())}`);
}

function collectRevalidationPaths(req) {
  const paths = new Set([BLOG_INDEX_PATH]);
  const body = req.body || {};
  const entry = body.entry || body.data?.attributes || body.data || body;

  addBlogTitle(paths, entry?.title);
  addBlogTitle(paths, body.title);

  if (Array.isArray(body.paths)) {
    body.paths.forEach((path) => addPath(paths, path));
  }

  if (typeof body.path === "string") {
    addPath(paths, body.path);
  }

  return Array.from(paths);
}

export default async function handler(req, res) {
  if (!process.env.REVALIDATE_SECRET) {
    return res.status(500).json({
      revalidated: false,
      message: "REVALIDATE_SECRET is not configured",
    });
  }

  if (getSecret(req) !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ revalidated: false, message: "Invalid secret" });
  }

  try {
    const paths = collectRevalidationPaths(req);

    for (const path of paths) {
      await res.revalidate(path);
    }

    return res.json({ revalidated: true, paths });
  } catch (error) {
    return res.status(500).json({
      revalidated: false,
      message: error?.message || "Failed to revalidate",
    });
  }
}
