import { Routes } from "@angular/router";
import { HomePagePageComponent } from "./pages/homePage/home-page.page.component";
import { AboutPageComponent } from "./pages/about/about.page.component";
import { ContactPageComponent } from "./pages/contact/contact.page.component";
import { DownloadsPageComponent } from "./pages/downloads/downloads.page.component";
import { ProjectsPageComponent } from "./pages/projects/projects.page.component";
import { LoginPageComponent } from "./pages/usersManagement/login.page.component";
import { RegisterPageComponent } from "./pages/usersManagement/register.page.component";
import { ProjectPageComponent } from "./pages/projects/project.page.component";
import { ProjectEditPageComponent } from "./pages/projects/project-edit.page.component";
import { DownloadsAddPageComponent } from "./pages/downloads/download-add.page.component";
import { DownloadsUpdatePageComponent } from "./pages/downloads/download-update.page.component";

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
    path: "downloadsAdd",
    component: DownloadsAddPageComponent,
  },
  {
    path: "downloadsUpdate/:id/:name/:description/:addressurl",
    component: DownloadsUpdatePageComponent,
  },
  {
    path: "projects",
    component: ProjectsPageComponent,
  },
  {
    path: "project/:id",
    component: ProjectPageComponent,
  },
  {
    path: "projectEdit/:id",
    component: ProjectEditPageComponent,
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
