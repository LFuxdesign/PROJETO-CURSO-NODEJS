
import DOMPurify from "dompurify";
import { useEffect } from "react";

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
    ALLOWED_ATTR: ["href", "target"],
  });
  return textolimpo;
}

export const imagesFormats = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
export const videoFormats = [".mp4", ".wav", ".mov", ".avi", ".webm"];
export const videoPlatforms = [
  "https://youtube.com",
  "youtube.com",
  "https://www.youtube.com",
  "www.youtube.com",
  "https://youtu.be",
  "youtu.be",
  "https://vimeo.com",
  "vimeo.com",
  "https://www.vimeo.com",
  "www.vimeo.com",
];

export function isAFunction(str) {
  return typeof str === "function";
}

export const useIntersectionObserver = (options) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".useObserver");

    const observer = new IntersectionObserver((elements, observer) => {
      elements.forEach((element) => {
        if (element.isIntersecting) {
          element.target.classList.add("entryAnimation");
          if (!element.target.classList.contains("allowReobserver")) {
            observer.unobserve(element.target);
          }
        } else if (element.target.classList.contains("allowReobserver")) {
          element.target.classList.remove("entryAnimation")
        }
      });
    }, options);

    elements.forEach((el) => {
      el.classList.add("hideForObserver")
      observer.observe(el)
    });

    return () => observer.disconnect();
  }, [options]);
};
