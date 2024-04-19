import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  styles: [],
  template: `
    <h1
      class="text-green-200 bg-green-800 uppercase py-4 text-2xl text-center font-consolas"
    >
      {{ pageName }}
    </h1>
    <nav class="bg-green-800 py-4 px-5">
      <ul class="flex gap-5">
        <li class="text-green-400 font-bold font-consolas">
          <a>{{ homePage }}</a>
        </li>
        <li class="text-green-400 font-bold font-consolas">
          <a>{{ about }}</a>
        </li>
        <li class="text-green-400 font-bold font-consolas">
          <a>{{ projects }}</a>
        </li>
        <li class="text-green-400 font-bold font-consolas">
          <a>{{ downloads }}</a>
        </li>
        <li class="text-green-400 font-bold font-consolas">
          <a>{{ contact }}</a>
        </li>

        <li class="text-green-400 font-bold font-consolas uppercase ml-auto">
          <a>{{ languageEn }}</a>
        </li>
        <li class="text-green-400 font-bold font-consolas uppercase ">
          <a>{{ languagePl }}</a>
        </li>
      </ul>
    </nav>
  `,
})
export class HeaderComponent {
  pageName = "linky 141 page";

  homePage = "Home page";
  about = "About";
  projects = "Projects";
  downloads = "Downloads";
  contact = "Contact";

  languagePl = "PL";
  languageEn = "En";
}
