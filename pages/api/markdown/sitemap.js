import { sendMarkdownSitemapResponse } from "../../../lib/markdown";

export default async function handler(req, res) {
  return sendMarkdownSitemapResponse(req, res);
}
