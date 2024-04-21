import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { TranslationService } from "../services/translation.service";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  styles: [``],
  imports: [RouterLink, RouterLinkActive],
  template: `
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

        <select
          (change)="ChangeLanguage.emit($event)"
          class="header_select_style ml-auto"
        >
          <option value="en" [selected]="lang === 'en'">EN</option>
          <option value="pl" [selected]="lang === 'pl'">PL</option>
        </select>
        <button (click)="changedTheme()" class="header_list_style bar pr-3">
          {{ darkOrLightMode }}
        </button>
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  @Input() lang!: string;
  @Output() ChangeLanguage = new EventEmitter<Event>();
  @Output() ToggleTheme = new EventEmitter<void>();

  translationService = inject(TranslationService);

  darkOrLightMode = "empty";

  ngOnInit() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") this.darkOrLightMode = "Light mode";
    else this.darkOrLightMode = "Dark mode";
  }

  changedTheme() {
    this.ToggleTheme.emit();
    const theme = localStorage.getItem("theme");
    if (theme === "dark") this.darkOrLightMode = "Light mode";
    else this.darkOrLightMode = "Dark mode";
  }
}
