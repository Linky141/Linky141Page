import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HomePageData } from "../../models/home-page.model";

type FetchingError = { status: number; message: string };

type IdleState = {
  state: "idle";
};
type LoadingState = {
  state: "loading";
};
type SuccessState = {
  state: "success";
  result: HomePageData[];
};
type ErrorState = {
  state: "error";
  error: FetchingError;
};

type HomePageState = IdleState | LoadingState | SuccessState | ErrorState;

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    @if(editElement !== 1){
    <h1 class="text-center text-3xl mt-4 mb-3 mx-5  ">
      {{ state.state === "success" ? state.result[0].title : "" }}
    </h1>
    } @if(credentials==='admin'){ @if(editElement !== 1){
    <button
      mat-stroked-button
      color="primary"
      (click)="buttonEditTitleClick()"
      class=" ml-5"
    >
      {{ translationService.t("edit") }}
    </button>
    } @else {
    <mat-form-field class="w-full">
      <input
        matInput
        class="w-full"
        value="{{ state.state === 'success' ? state.result[0].title : '' }}"
      />
    </mat-form-field>
    <button class=" ml-5" mat-flat-button color="primary">
      {{ translationService.t("submit") }}
    </button>
    <button mat-button color="primary">
      {{ translationService.t("reset") }}
    </button>
    <button (click)="buttonEditTitleClick()" mat-button color="warn">
      {{ translationService.t("cancel") }}
    </button>
    } } @if(editElement !== 2){
    <h1 class=" mx-5">
      {{ state.state === "success" ? state.result[0].content : "" }}
    </h1>
    } @if(credentials==='admin'){ @if(editElement !== 2){
    <button
      (click)="buttonEditContentClick()"
      class=" ml-5"
      mat-stroked-button
      color="primary"
    >
      {{ translationService.t("edit") }}
    </button>
    } @else{
    <mat-form-field class="w-full">
      <textarea matInput>{{
        state.state === "success" ? state.result[0].content : ""
      }}</textarea>
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
export class HomePagePageComponent {
  credentials = ""; //todo: remove after add users
  // homePageData: HomePageData[] = [];
  state: HomePageState = { state: "idle" };
  private readonly URL = "http://localhost:3000";
  editElement = 0;

  translationService = inject(TranslationService);

  constructor() {
    this.state = { state: "loading" };
    fetch(`${this.URL}/homePageData`)
      .then<HomePageData[] | FetchingError>((response) => {
        if (response.ok) {
          return response.json();
        }
        return { status: response.status, message: response.statusText };
      })
      .then((response) => {
        if (Array.isArray(response)) {
          this.state = { state: "success", result: response };
        } else {
          this.state = { state: "error", error: response };
        }
      });
  }

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
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

  // title = "sample header text";
  // content =
  //   "Lorem ipsum dolor sit amet. Aut explicabo dolor sit ullam aliquid nam incidunt distinctio? Aut Quis corrupti non nulla ducimus qui adipisci perspiciatis ut corporis sint aut illo tenetur. Ut eius eaque ut necessitatibus voluptas et beatae necessitatibus. </p><p>Aut quas esse ea laboriosam sunt ut eligendi cupiditate! Sed ducimus reiciendis est eius fugit 33 ipsam saepe At unde corporis in optio ipsa. Et omnis quasi ad mollitia accusamus qui vero rerum id facere ipsam a aliquid dolor. </p><p>Ex incidunt aliquam et voluptas rerum ut voluptas repellat et ratione quia. Cum illo molestiae aut sint ratione est alias odio. Et molestiae voluptatem ut voluptates iure et accusamus porro est accusantium esse cum nisi sint aut reiciendis quia.";
}
