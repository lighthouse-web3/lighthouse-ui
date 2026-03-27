import { sendMarkdownResponse } from "../../../lib/markdown";

export default async function handler(req, res) {
  return sendMarkdownResponse(req, res, []);
}
