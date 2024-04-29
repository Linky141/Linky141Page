import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject, signal, computed } from "@angular/core";
import { Observable, catchError, EMPTY, tap } from "rxjs";
import { FetchingError } from "../../../utils/page-state.type";
import { CommentModel } from "../models/comment.model";
import { ProjectData } from "../models/project.model";

export type ProjectsUpdatePayload = {
  id?: number;
  title?: string;
  lastUpdate?: number;
  github?: string;
  description?: string;
  photos?: string[];
  comments?: CommentModel[];
};
export type ProjectsAddPayload = {
  id?: number;
  title?: string;
  lastUpdate?: number;
  github?: string;
  description?: string;
  photos?: string[];
  comments?: CommentModel[];
};

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: "root",
})
export class ProjectsApiService {
  private http = inject(HttpClient);

  private $idle = signal(true);
  private $loading = signal(true);
  private $error = signal<FetchingError | null>(null);

  $loadingState = computed(() => {
    return {
      idle: this.$idle(),
      loading: this.$loading(),
      error: this.$error(),
    };
  });

  private baseURL = "http://localhost:3000";

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$loading.set(true);
    this.$error.set(null);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        this.$error.set({ message: e.message, status: e.status });
        this.$loading.set(false);
        return EMPTY;
      }),
      tap(() => {
        this.$loading.set(false);
      })
    );
  }

  getAll() {
    return this.withLoadingState(
      this.http.get<ProjectData[]>(`${this.baseURL}/projects`, {
        observe: "response",
      })
    );
  }

  getSingle(id: string) {
    return this.withLoadingState(
      this.http.get<ProjectData[]>(`${this.baseURL}/projects`, {
        observe: "response",
        params: { id },
      })
    );
  }

  update(id: string, payload: ProjectsUpdatePayload) {
    return this.http.patch<ProjectData>(
      `${this.baseURL}/projects/${id}`,
      payload
    );
  }

  add(payload: ProjectsAddPayload) {
    return this.http.post<ProjectData>(`${this.baseURL}/projects`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseURL}/projects/${id}`);
  }
}
