import { Component, HostBinding, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import i18next from "i18next";
import { TranslationService } from "./services/translation.service";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <app-header (ChangeLanguage)="ChangeLanguage($event)" [lang]="lang" />
    <router-outlet />
  `,
  styles: [],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  translationService = inject(TranslationService);
  private themeService = inject(ThemeService);

  lang = "";

  @HostBinding("class") componentCssClass: string;

  constructor() {
    this.componentCssClass = "";
  }

  ngOnInit() {
    this.lang = localStorage.getItem("language") || "en";
    if (localStorage.getItem("theme") === "dark") {
      this.themeService.toggleDarkTheme();
    }
  }

  ChangeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    i18next.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  }
}
