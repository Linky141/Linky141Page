import { Injectable, computed, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FetchingError } from "../../../utils/page-state.type";
import { EMPTY, Observable, catchError, tap } from "rxjs";
import { DownloadsData } from "../models/downloads.model";

export type DownloadsUpdatePayload = {
  name?: string;
  description?: string;
  downloadLink?: string;
  uploadDate?: number;
};
export type DownloadsAddPayload = {
  name?: string;
  description?: string;
  downloadLink?: string;
  uploadDate?: number;
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

  private baseURL = "http://localhost:5000/api/Downloads";

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

  GetDownloads() {
    return this.withLoadingState(
      this.http.get<DownloadsData[]>(`${this.baseURL}/GetDownloads`, {
        observe: "response",
      })
    );
  }

  UpdateDownloads(id: string, payload: DownloadsUpdatePayload) {
    return this.http.patch<DownloadsData>(
      `${this.baseURL}/UpdateDownloads/${id}`,
      payload
    );
  }

  AddDownloads(payload: DownloadsAddPayload) {
    return this.http.post<DownloadsData>(`${this.baseURL}/AddDownloads`, payload);
  }

  DeleteDownloads(id: string) {
    return this.http.delete(`${this.baseURL}/DeleteDownloads/${id}`);
  }
}
