import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <app-header />
    <!-- <router-outlet /> -->
  `,
  styles: [],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {}
