import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-about",
  standalone: true,
  template: `
    @if(editElement !== 1){
    <h1 class="font-consolas mx-5">
      {{ content }}
    </h1>
    } @if(isAdmin==='true'){ @if(editElement !== 1){
    <button (click)="buttonEditContentClick()" class="body_button_rounded ml-5">
      {{ translationService.t("edit") }}
    </button>
    } @else {
    <textarea
      class="body_input mb-3 block mx-5 mt-5"
      style="width: calc(100% - 40px);"
      >{{ content }}</textarea
    >
    <button class="body_button_rounded_left_submit ml-5">
      {{ translationService.t("submit") }}
    </button>
    <button class="body_button_rounded_middle">
      {{ translationService.t("reset") }}
    </button>
    <button
      (click)="buttonEditContentClick()"
      class="body_button_rounded_right_cancel"
    >
      {{ translationService.t("cancel") }}
    </button>
    } }
  `,
})
export class AboutPageComponent {
  isAdmin = "false"; //todo: remove after add users
  editElement = 0;
  content =
    "Lorem ipsum dolor sit amet. Aut explicabo dolor sit ullam aliquid nam incidunt distinctio? Aut Quis corrupti non nulla ducimus qui adipisci perspiciatis ut corporis sint aut illo tenetur. Ut eius eaque ut necessitatibus voluptas et beatae necessitatibus. </p><p>Aut quas esse ea laboriosam sunt ut eligendi cupiditate! Sed ducimus reiciendis est eius fugit 33 ipsam saepe At unde corporis in optio ipsa. Et omnis quasi ad mollitia accusamus qui vero rerum id facere ipsam a aliquid dolor. </p><p>Ex incidunt aliquam et voluptas rerum ut voluptas repellat et ratione quia. Cum illo molestiae aut sint ratione est alias odio. Et molestiae voluptatem ut voluptates iure et accusamus porro est accusantium esse cum nisi sint aut reiciendis quia.";

  translationService = inject(TranslationService);

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") || "false"; //todo: remove after add users
  }

  buttonEditContentClick() {
    if (this.editElement === 0) {
      this.editElement = 1;
    } else if (this.editElement === 1) {
      this.editElement = 0;
    }
  }
}
