import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    @if(editElement !== 1){
    <h1 class=" mx-5">
      {{ content }}
    </h1>
    } @if(credentials==='admin'){ @if(editElement !== 1){
    <button
      (click)="buttonEditContentClick()"
      class=" ml-5"
      mat-stroked-button
      color="primary"
    >
      {{ translationService.t("edit") }}
    </button>
    } @else {
    <mat-form-field class="w-full">
      <textarea matInput>{{ content }}</textarea>
    </mat-form-field>
    <button class=" ml-5" mat-flat-button color="primary">
      {{ translationService.t("submit") }}
    </button>
    <button mat-button color="primary">
      {{ translationService.t("reset") }}
    </button>
    <button (click)="buttonEditContentClick()" mat-button color="warn">
      {{ translationService.t("cancel") }}
    </button>
    } }
  `,
})
export class AboutPageComponent {
  credentials = ""; //todo: remove after add users
  editElement = 0;
  content =
    "Lorem ipsum dolor sit amet. Aut explicabo dolor sit ullam aliquid nam incidunt distinctio? Aut Quis corrupti non nulla ducimus qui adipisci perspiciatis ut corporis sint aut illo tenetur. Ut eius eaque ut necessitatibus voluptas et beatae necessitatibus. </p><p>Aut quas esse ea laboriosam sunt ut eligendi cupiditate! Sed ducimus reiciendis est eius fugit 33 ipsam saepe At unde corporis in optio ipsa. Et omnis quasi ad mollitia accusamus qui vero rerum id facere ipsam a aliquid dolor. </p><p>Ex incidunt aliquam et voluptas rerum ut voluptas repellat et ratione quia. Cum illo molestiae aut sint ratione est alias odio. Et molestiae voluptatem ut voluptates iure et accusamus porro est accusantium esse cum nisi sint aut reiciendis quia.";

  translationService = inject(TranslationService);

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  buttonEditContentClick() {
    if (this.editElement === 0) {
      this.editElement = 1;
    } else if (this.editElement === 1) {
      this.editElement = 0;
    }
  }
}
