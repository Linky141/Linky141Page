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
      <button (click)="testAdminChange('admin')" class="pr-3">
        ADMIN={{ credentials === "admin" ? "1" : "0" }}
      </button>
      <button (click)="testAdminChange('user')" class="pr-3">
        USER={{ credentials === "user" ? "1" : "0" }}
      </button>
      <button (click)="testAdminChange('')" class="pr-3">
        GUEST={{ credentials === "" ? "1" : "0" }}
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
            @if(theme === 'light'){
            {{ translationService.t("lightTheme") }}
            } @else {
            {{ translationService.t("darkTheme") }}
            }
          </button>
        </li>
        @if(credentials !== '') {
        <li class="header_list_style">
          <a class="header_link_padding">
            {{ credentials.toUpperCase() }}
          </a>
        </li>
        <li class="header_list_style">
          <a class="header_link_padding">
            {{ translationService.t("logout") }}
          </a>
        </li>
        } @else{
        <li class="header_list_style">
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
        }
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  @Input() lang!: string;
  @Output() ChangeLanguage = new EventEmitter<Event>();

  translationService = inject(TranslationService);
  themeService = inject(ThemeService);

  theme = "light";
  credentials = ""; //todo: remove after add users

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    const theme = localStorage.getItem("theme");
    if (theme === "dark") this.theme = "light";
    else this.theme = "dark";
  }

  changedTheme() {
    this.themeService.toggleDarkTheme();
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  }

  testAdminChange(credential: string) {
    //todo: remove after add users
    // const credentials = localStorage.getItem("credentials");
    if (credential === "admin") {
      localStorage.setItem("credentials", "admin");
      this.credentials = "admin";
    } else if (credential === "user") {
      localStorage.setItem("credentials", "user");
      this.credentials = "user";
    } else {
      localStorage.removeItem("credentials");
      this.credentials = "";
    }
    window.location.reload();
  }
}
