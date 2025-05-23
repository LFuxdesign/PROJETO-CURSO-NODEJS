
import DOMPurify from "dompurify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      "mark",
      "br",
      "ol",
      "li",
      "code",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "div",
      "blockquote"
    ],
    ALLOWED_ATTR: ["href", "target", "start", "class"],
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
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;

        if (isIntersecting) {
          target.classList.add("entryAnimation");

          if (!target.classList.contains("allowReobserver")) {
            observer.unobserve(target);
          }
        } else {
          if (target.classList.contains("allowReobserver")) {
            target.classList.remove("entryAnimation");
          }
        }
      });
    }, options);

    const timeout = setTimeout(() => {
      if (!isMounted) return;

      const elements = document.querySelectorAll(".useObserver");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [options, location.pathname]);
};

export function capFirstLetter(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const cpuThreads = navigator.hardwareConcurrency;
