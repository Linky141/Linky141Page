import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { TranslationService } from "../services/translation.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  styles: [],
  imports: [CommonModule],
  template: `
    <h1 class="header_style header_background">
      {{ translationService.t("pageName") }}
    </h1>
    <nav class="header_background">
      <ul class="flex gap-5">
        <li class="header_button_style">
          <button class="py-4 px-4">
            {{ translationService.t("homePage") }}
          </button>
        </li>
        <li class="header_button_style">
          <button class="py-4 px-4">{{ translationService.t("about") }}</button>
        </li>
        <li class="header_button_style">
          <button class="py-4 px-4">
            {{ translationService.t("projects") }}
          </button>
        </li>
        <li class="header_button_style">
          <button class="py-4 px-4">
            {{ translationService.t("downloads") }}
          </button>
        </li>
        <li class="header_button_style">
          <button class="py-4 px-4">
            {{ translationService.t("contact") }}
          </button>
        </li>

        <select
          (change)="ChangeLanguage.emit($event)"
          class="select_header_style ml-auto"
        >
          <option value="en" [selected]="lang === 'en'">EN</option>
          <option value="pl" [selected]="lang === 'pl'">PL</option>
        </select>
        <button (click)="ToggleTheme.emit()" class="header_button_style pr-3">
          Dark mode
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
}
