import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export function sanitizeHTML(content) {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  return purify.sanitize(content);
}
