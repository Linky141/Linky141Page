import { Injectable, computed, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FetchingError } from "../../../utils/page-state.type";
import { EMPTY, Observable, catchError, tap } from "rxjs";
import { DownloadsData } from "../models/downloads.model";

export type DownloadsUpdatePayload = {
  name?: string;
  description?: string;
  downloadLink?: string;
  uploadDate: number;
};
export type DownloadsAddPayload = {
  name?: string;
  description?: string;
  downloadLink?: string;
  uploadDate: number;
};

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: "root",
})
export class DownloadsApiService {
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
      this.http.get<DownloadsData[]>(`${this.baseURL}/downloads`, {
        observe: "response",
      })
    );
  }

  update(id: string, payload: DownloadsUpdatePayload) {
    return this.http.patch<DownloadsData>(
      `${this.baseURL}/downloads/${id}`,
      payload
    );
  }

  add(payload: DownloadsAddPayload) {
    return this.http.post<DownloadsData>(`${this.baseURL}/downloads`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/downloads/${id}`);
  }
}
