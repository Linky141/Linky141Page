import { HostBinding, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  @HostBinding("class") componentCssClass: string;

  constructor() {
    this.componentCssClass = "";
  }

  toggleDarkTheme() {
    this.componentCssClass = this.componentCssClass === "dark" ? "" : "dark";
    localStorage.setItem("theme", this.componentCssClass);

    if (this.componentCssClass === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}
