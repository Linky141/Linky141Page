import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import {
  DownloadsAddPayload,
  DownloadsApiService,
  DownloadsUpdatePayload,
} from "./downloads.api.service";
import { DownloadsStateService } from "./downloads.state.service";

@Injectable({ providedIn: "root" })
export class DownloadsService {
  private httpService = inject(DownloadsApiService);
  private state = inject(DownloadsStateService);

  getAll() {
    return this.httpService.GetDownloads().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setDownloadsData(res.body);
        }
      })
    );
  }

  update(id: string, payload: DownloadsUpdatePayload) {
    return this.httpService.UpdateDownloads(id, payload).pipe(
      tap((res) => {
        this.state.updateDownloads(res);
      })
    );
  }

  delete(id: string) {
    return this.httpService.DeleteDownloads(id).pipe(
      tap(() => {
        this.state.removeDownloads(id);
      })
    );
  }

  add(payload: DownloadsAddPayload) {
    return this.httpService.AddDownloads(payload).pipe(
      tap((download) => {
        this.state.addDownloads(download);
      })
    );
  }
}
