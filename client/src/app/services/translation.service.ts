import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

const defaultLang = localStorage.getItem("language") || "en";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  constructor() {
    i18next.use(HttpBackend).init({
      lng: defaultLang,
      fallbackLng: defaultLang,
      backend: {
        loadPath: "/assets/i18n/{{lng}}.json",
      },
    });
  }

  t(text: string) {
    return i18next.t(text);
  }
}
