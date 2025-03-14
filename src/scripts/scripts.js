
import DOMPurify from "dompurify";

export function cleanHtml(text) {
  const textolimpo = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      "p",
      "a",
      "i",
      "b",
      "u",
      "s",
      "strong",
      "mark"
    ],
    ALLOWED_ATTR: ["href"],
  });
  return textolimpo;
}
