import { Injectable, computed, inject, signal } from "@angular/core";
import { FetchingError } from "../../../utils/page-state.type";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, EMPTY, tap } from "rxjs";
import { AboutData } from "../models/about.model";

export type AboutUpdatePayload = { content?: string };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: "root",
})
export class AboutApiService {
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

  private baseURL = "http://localhost:5000/api/About";

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

  GetAbout() {
    return this.withLoadingState(
      this.http.get<AboutData[]>(`${this.baseURL}/GetAbout`, {
        observe: "response",
      })
    );
  }

  UpdateAbout(payload: AboutUpdatePayload) {
    return this.http.patch<AboutData>(`${this.baseURL}/UpdateAbout`, payload);
  }
}
