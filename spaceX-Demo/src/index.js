import React from "react";
import ReactDOM from "react-dom/client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import "./index.css";
import App from "./App";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "hi", "gr", "fr"],
    fallbackLng: "en",
    debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/language/{{lng}}.json",
    },
  });
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
    <App />
    </>
);
