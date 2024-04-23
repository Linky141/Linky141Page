import { Routes } from "@angular/router";
import { HomePagePageComponent } from "./pages/homePage/homePage.page.component";
import { AboutPageComponent } from "./pages/abut/about.page.component";
import { ContactPageComponent } from "./pages/contact/contact.page.component";
import { DownloadsPageComponent } from "./pages/downloads/downloads.page.component";
import { ProjectsPageComponent } from "./pages/projects/projects.page.component";
import { LoginPageComponent } from "./pages/usersManagement/login.page.component";
import { RegisterPageComponent } from "./pages/usersManagement/register.page.component";

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
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "**",
    redirectTo: "homePage",
  },
];
