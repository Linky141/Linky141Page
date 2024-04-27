import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import { AboutApiService, AboutUpdatePayload } from "./about.api.service";
import { AboutStateService } from "./about.state.service";

@Injectable({ providedIn: "root" })
export class AboutService {
  private httpService = inject(AboutApiService);
  private state = inject(AboutStateService);

  getAll() {
    return this.httpService.getAll().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setAboutData(res.body);
        }
      })
    );
  }

  update(payload: AboutUpdatePayload) {
    return this.httpService.update(payload).pipe(
      tap((res) => {
        this.state.updateAboutData(res);
      })
    );
  }
}
