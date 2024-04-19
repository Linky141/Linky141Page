import { Component, inject } from "@angular/core";
import i18next from "i18next";
import { Observable } from "rxjs";
import { TranslationService } from "../services/translation.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  styles: [],
  imports: [CommonModule],
  template: `
    <h1
      class="text-green-200 bg-green-800 uppercase py-4 text-2xl text-center font-consolas"
    >
      {{ translationService.t("pageName") }}
    </h1>
    <nav class="bg-green-800">
      <ul class="flex gap-5">
        <li
          class="text-green-400 font-bold font-consolas rounded-tl-2xl rounded-tr-2xl hover:text-green-50"
        >
          <button class="py-4 px-4">
            {{ translationService.t("homePage") }}
          </button>
        </li>
        <li
          class="text-green-400 font-bold font-consolas rounded-tl-2xl rounded-tr-2xl hover:text-green-50"
        >
          <button class="py-4 px-4">{{ translationService.t("about") }}</button>
        </li>
        <li
          class="text-green-400 font-bold font-consolas rounded-tl-2xl rounded-tr-2xl hover:text-green-50"
        >
          <button class="py-4 px-4">
            {{ translationService.t("projects") }}
          </button>
        </li>
        <li
          class="text-green-400 font-bold font-consolas rounded-tl-2xl rounded-tr-2xl hover:text-green-50"
        >
          <button class="py-4 px-4">
            {{ translationService.t("downloads") }}
          </button>
        </li>
        <li
          class="text-green-400 font-bold font-consolas rounded-tl-2xl rounded-tr-2xl hover:text-green-50"
        >
          <button class="py-4 px-4">
            {{ translationService.t("contact") }}
          </button>
        </li>

        <select
          (change)="ChangeLanguage($event)"
          class="text-green-400 font-bold font-consolas uppercase ml-auto rounded-2xl bg-green-800 hover:bg-green-700"
        >
          <option value="en" [selected]="lang === 'en'">EN</option>
          <option value="pl" [selected]="lang === 'pl'">PL</option>
        </select>
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  translationService = inject(TranslationService);

  lang = "";

  ngOnInit() {
    this.lang = localStorage.getItem("language") || "en";
  }
  ChangeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    i18next.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  }
}
