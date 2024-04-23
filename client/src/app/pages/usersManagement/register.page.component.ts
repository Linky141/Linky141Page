import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [MatButtonModule, MatInputModule, RouterLink],
  template: `
    <div class="flex justify-center items-center flex-col h-[90vh]">
      <mat-form-field>
        <mat-label>{{ translationService.t("username") }}</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>{{ translationService.t("email") }}</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>{{ translationService.t("password") }}</mat-label>
        <input matInput />
      </mat-form-field>
      <button mat-flat-button color="primary">
        {{ translationService.t("register") }}
      </button>
      <a routerLink="/login" class="mt-10 text-xs">{{
        translationService.t("haveAccountLogin")
      }}</a>
    </div>
  `,
})
export class RegisterPageComponent {
  translationService = inject(TranslationService);
}
