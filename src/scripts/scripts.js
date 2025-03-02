import React, { useEffect, useState, useMemo } from "react";
import { Router, useNavigate, Route } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  // headers: {
  //     'Content-Type': 'multipart/form-data',
  // },
});

export function cleanHtml(text) {
  const textolimpo = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      "p",
      "a",
      "i",
      "b",
      "u",
      "s",
      "strike",
      "ul",
      "li",
      "br",
      "div",
    ],
    ALLOWED_ATTR: ["style", "href"],
  });
  return textolimpo;
}

export function cleanBrTag(text) {
  const regexQuebraLinha = /<br\s*\/?>/g;

  text = text.replace(regexQuebraLinha, " ");

  return text.trim();
}

export function removeAscentoseMaiusculas(txt) {
  const acentos = {
    á: "a",
    à: "a",
    ã: "a",
    â: "a",
    ä: "a",
    é: "e",
    è: "e",
    ê: "e",
    ë: "e",
    í: "i",
    ì: "i",
    î: "i",
    ï: "i",
    ó: "o",
    ò: "o",
    õ: "o",
    ô: "o",
    ö: "o",
    ú: "u",
    ù: "u",
    û: "u",
    ü: "u",
    ç: "c",
    ñ: "n",
  };
  const textoSemAcentos = txt
    .split("")
    .map((char) => acentos[char] || char)
    .join("")
    .toLowerCase();

  return textoSemAcentos;
}

export function isFunction(functionDeclaration) {
  if (typeof functionDeclaration == "function") {
    return true;
  }
  return false;
}

export function HighQualityImage({
  lowQualitySrc,
  highQualitySrc,
  alt,
  id,
  width,
  height,
}) {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highQualityImage = new Image();
    highQualityImage.src = highQualitySrc;

    highQualityImage.onload = () => {
      setImageSrc(highQualitySrc);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    return () => {
      highQualityImage.onload = null;
    };
  }, [highQualitySrc]);
  return (
    <img
      id={id}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      style={{
        filter: isLoading ? "blur(5px)" : "blur(0px)",
        transition: "all .3s ease-in-out",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}

export async function getImageProfile(
  userid,
  onlyHigh = false,
  onlyLow = false
) {
  let lowResImg, highResImg;

  async function fetchImage(url) {
    try {
      const response = await axios.get(url,
        {
          withCredentials: true,
          responseType: "blob",
          headers: {
            'Cache-Control': 'max-age=3600'
          }
        }
      ); // Configura o Axios para receber um blob
      return URL.createObjectURL(response.data); // Converte o Blob para uma URL utilizável
    } catch (error) {
      console.error(`Erro ao buscar a imagem: ${url}`, error);
      throw error;
    }
  }

  const url = new URL(window.location.href);
  const host = url.hostname;
  const imageUrls = [
    `https://${host}/notasApp/api/getProfileImage.php?i=${userid}`,
    `https://${host}/notasApp/api/getProfileImage.php?i=${userid}&quality=low`,
  ];

  try {
    if (onlyHigh) {
      const highRes = await fetchImage(imageUrls[0]);
      highResImg = highRes;
      return highResImg;
    } else if (onlyLow) {
      const lowRes = await fetchImage(imageUrls[1]);
      lowResImg = lowRes;
      return lowResImg;
    } else {
      const lowRes = await fetchImage(imageUrls[1]);
      lowResImg = lowRes;

      const highRes = await fetchImage(imageUrls[0]);
      highResImg = highRes;
    }
  } catch (error) {
    console.error("Erro ao carregar as imagens:", error);
  }

  return { lowResImg, highResImg };
}

export async function userIsAuthenticated() {
  const url = new URL(window.location.href);
  const host = "192.168.1.241";
  try {
    const response = await instance.post(
      `https://${host}/notasApp/api/verifyUser.php`
    );
    console.log(response);
    if (response.data.authenticated) {
      return response.data.authenticated;
    }
    return false;
  } catch (error) {
    console.log(error);
    // if (error.response) {

    // } else {

    // }
  }
}
export async function createFolder(titulo) {
  const url = new URL(window.location.href);
  const host = "192.168.1.241";
  try {
    const response = await instance.post(
      `https://${host}/notasApp/api/verifyUser.php`
    );
    if (response.data.authenticated) {
      const data = {
        idUsuario: response.data.data.id,
        titulo: titulo,
      };
      try {
        await instance.post(
          `https://${host}/notasApp/api/folderControl.php`,
          data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(async () => {
          // await getData();
        }, 500);
      }
    }
    console.warn(response);
  } catch (error) {
    console.log(error);
    if (error.response) {
    } else {
    }
  }
}
