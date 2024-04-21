import { Routes } from "@angular/router";
import { HomePagePageComponent } from "./pages/homePage/homePage.page.component";
import { AboutPageComponent } from "./pages/abut/about.page.component";
import { ContactPageComponent } from "./pages/contact/contact.page.component";
import { DownloadsPageComponent } from "./pages/downloads/downloads.page.component";
import { ProjectsPageComponent } from "./pages/projects/projects.page.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "homePage",
    pathMatch: "full",
  },
  {
    path: "homePage",
    component: HomePagePageComponent,
  },
  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
  },
  {
    path: "downloads",
    component: DownloadsPageComponent,
  },
  {
    path: "projects",
    component: ProjectsPageComponent,
  },
  {
    path: "**",
    redirectTo: "homePage",
  },
];
