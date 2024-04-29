import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DownloadsData } from "../../downloads/models/downloads.model";
import { ProjectData } from "../models/project.model";

const initialState = {
  projects: [] as ProjectData[],
};

type ProjectsStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class ProjectsStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setProjects(data: ProjectData[]) {
    this.state$.next({
      projects: data,
    });
  }

  updateProject(data: ProjectData) {
    const updatedData = this.state$.value.projects.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      projects: updatedData,
    });
  }

  removeProject(id: ProjectData["id"]) {
    const updatedData = this.state$.value.projects.filter((res) => {
      return res.id !== id;
    });

    this.state$.next({
      projects: updatedData,
    });
  }

  addProject(projectData: ProjectData) {
    this.state$.next({
      projects: [...this.state$.value.projects, projectData],
    });
  }
}
