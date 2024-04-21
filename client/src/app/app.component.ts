import { Component, HostBinding, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import i18next from "i18next";
import { TranslationService } from "./services/translation.service";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <app-header
      (ChangeLanguage)="ChangeLanguage($event)"
      (ToggleTheme)="ToggleTheme()"
      [lang]="lang"
    />
    <router-outlet />
  `,
  styles: [],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  translationService = inject(TranslationService);

  lang = "";

  @HostBinding("class") componentCssClass: string;

  constructor() {
    this.componentCssClass = "";
  }

  ngOnInit() {
    this.lang = localStorage.getItem("language") || "en";
    if (localStorage.getItem("theme") === "dark") {
      this.ToggleTheme();
    }
  }

  ChangeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    i18next.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  }

  ToggleTheme() {
    this.componentCssClass = this.componentCssClass === "dark" ? "" : "dark";
    localStorage.setItem("theme", this.componentCssClass);

    if (this.componentCssClass === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}
