import { sendMarkdownResponse } from "../../../lib/markdown";

export default async function handler(req, res) {
  const { slug = [] } = req.query;
  return sendMarkdownResponse(req, res, slug);
}
