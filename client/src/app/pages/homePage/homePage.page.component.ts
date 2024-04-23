import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  template: `
    @if(editElement !== 1){
    <h1 class="text-center text-3xl mt-4 mb-3 mx-5  ">
      {{ title }}
    </h1>
    } @if(isAdmin==='true'){ @if(editElement !== 1){
    <button (click)="buttonEditTitleClick()" class=" ml-5">
      {{ translationService.t("edit") }}
    </button>
    } @else {
    <textarea class=" mb-3 block mx-5 mt-5" style="width: calc(100% - 40px);">{{
      title
    }}</textarea>
    <button class=" ml-5">
      {{ translationService.t("submit") }}
    </button>
    <button class="">
      {{ translationService.t("reset") }}
    </button>
    <button (click)="buttonEditTitleClick()" class="">
      {{ translationService.t("cancel") }}
    </button>
    } } @if(editElement !== 2){
    <h1 class=" mx-5">{{ content }}</h1>
    } @if(isAdmin==='true'){ @if(editElement !== 2){
    <button (click)="buttonEditContentClick()" class=" ml-5">
      {{ translationService.t("edit") }}
    </button>
    } @else{
    <textarea class=" mb-3 block mx-5" style="width: calc(100% - 40px);">{{
      content
    }}</textarea>
    <button class=" ml-5">
      {{ translationService.t("submit") }}
    </button>
    <button class="">
      {{ translationService.t("reset") }}
    </button>
    <button (click)="buttonEditContentClick()" class="">
      {{ translationService.t("cancel") }}
    </button>
    } }
  `,
})
export class HomePagePageComponent {
  isAdmin = "false"; //todo: remove after add users
  editElement = 0;

  translationService = inject(TranslationService);

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") || "false"; //todo: remove after add users
  }

  buttonEditTitleClick() {
    if (this.editElement === 0) {
      this.editElement = 1;
    } else if (this.editElement === 1) {
      this.editElement = 0;
    }
  }

  buttonEditContentClick() {
    if (this.editElement === 0) {
      this.editElement = 2;
    } else if (this.editElement === 2) {
      this.editElement = 0;
    }
  }

  title = "sample header text";
  content =
    "Lorem ipsum dolor sit amet. Aut explicabo dolor sit ullam aliquid nam incidunt distinctio? Aut Quis corrupti non nulla ducimus qui adipisci perspiciatis ut corporis sint aut illo tenetur. Ut eius eaque ut necessitatibus voluptas et beatae necessitatibus. </p><p>Aut quas esse ea laboriosam sunt ut eligendi cupiditate! Sed ducimus reiciendis est eius fugit 33 ipsam saepe At unde corporis in optio ipsa. Et omnis quasi ad mollitia accusamus qui vero rerum id facere ipsam a aliquid dolor. </p><p>Ex incidunt aliquam et voluptas rerum ut voluptas repellat et ratione quia. Cum illo molestiae aut sint ratione est alias odio. Et molestiae voluptatem ut voluptates iure et accusamus porro est accusantium esse cum nisi sint aut reiciendis quia.";
}
