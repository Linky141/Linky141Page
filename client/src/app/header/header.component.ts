import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { TranslationService } from "../services/translation.service";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../services/theme.service";

@Component({
  selector: "app-header",
  standalone: true,
  styles: [``],
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="bg-yellow-600">
      <button (click)="testAdminChange()" class="pr-3">
        ADMIN={{ isAdmin === "true" ? "1" : "0" }}
      </button>
    </div>
    <h1 class="header_title_style background_color_dark">
      {{ translationService.t("pageName") }}
    </h1>
    <nav class="header_background">
      <ul class="flex">
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/homePage"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("homePage") }}
          </a>
        </li>
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/about"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("about") }}
          </a>
        </li>
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/projects"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("projects") }}
          </a>
        </li>
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/downloads"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("downloads") }}
          </a>
        </li>
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/contact"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("contact") }}
          </a>
        </li>

        <li class="header_list_style ml-auto">
          <a
            class="header_link_padding"
            routerLink="/login"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("signIn") }}
          </a>
        </li>
        <li class="header_list_style">
          <a
            class="header_link_padding"
            routerLink="/register"
            routerLinkActive="header_list_active_style"
          >
            {{ translationService.t("signUp") }}
          </a>
        </li>
        <li class="header_list_style">
          <select
            (change)="ChangeLanguage.emit($event)"
            class="header_select_style"
          >
            <option value="en" [selected]="lang === 'en'">EN</option>
            <option value="pl" [selected]="lang === 'pl'">PL</option>
          </select>
        </li>
        <li class="header_list_style">
          <button (click)="changedTheme()" class="header_list_style bar pr-3">
            {{ darkOrLightMode }}
          </button>
        </li>
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  @Input() lang!: string;
  @Output() ChangeLanguage = new EventEmitter<Event>();

  translationService = inject(TranslationService);
  themeService = inject(ThemeService);

  darkOrLightMode = "empty";
  isAdmin = "false"; //todo: remove after add users

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") || "false"; //todo: remove after add users
    const theme = localStorage.getItem("theme");
    if (theme === "dark") this.darkOrLightMode = "Light mode";
    else this.darkOrLightMode = "Dark mode";
  }

  changedTheme() {
    this.themeService.toggleDarkTheme();
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      this.darkOrLightMode = "Light mode";
    } else {
      this.darkOrLightMode = "Dark mode";
    }
  }

  testAdminChange() {
    //todo: remove after add users
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      localStorage.setItem("isAdmin", "false");
      this.isAdmin = "false";
    } else {
      localStorage.setItem("isAdmin", "true");
      this.isAdmin = "true";
    }
    window.location.reload();
  }
}
