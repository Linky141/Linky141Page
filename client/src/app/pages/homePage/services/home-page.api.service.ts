import { Injectable, computed, inject, signal } from "@angular/core";
import { HomePageData } from "../models/home-page.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FetchingError } from "../../../utils/page-state.type";
import { EMPTY, Observable, catchError, tap } from "rxjs";

export type HomePageUpdatePayload = { title?: string; content?: string };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: "root",
})
export class HomePageApiService {
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
      this.http.get<HomePageData[]>(`${this.baseURL}/homePageData`, {
        observe: "response",
      })
    );
  }

  update(payload: HomePageUpdatePayload) {
    return this.http.patch<HomePageData>(
      `${this.baseURL}/homePageData/1`,
      payload
    );
  }
}
