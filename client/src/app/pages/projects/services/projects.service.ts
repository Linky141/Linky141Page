import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import {
  ProjectsAddPayload,
  ProjectsApiService,
  ProjectsUpdatePayload,
} from "./projects.api.service";
import { ProjectsStateService } from "./projects.state.service";

@Injectable({ providedIn: "root" })
export class ProjectsService {
  private httpService = inject(ProjectsApiService);
  private state = inject(ProjectsStateService);

  getAll() {
    return this.httpService.getAll().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setProjects(res.body);
        }
      })
    );
  }

  getSingle(id: string) {
    return this.httpService.getSingle(id).pipe(
      tap((res) => {
        if (res.body) {
          this.state.setProjects(res.body);
        }
      })
    );
  }

  update(id: string, payload: ProjectsUpdatePayload) {
    return this.httpService.update(id, payload).pipe(
      tap((res) => {
        this.state.updateProject(res);
      })
    );
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeProject(id);
      })
    );
  }

  add(payload: ProjectsAddPayload) {
    return this.httpService.add(payload).pipe(
      tap((download) => {
        this.state.addProject(download);
      })
    );
  }
}
