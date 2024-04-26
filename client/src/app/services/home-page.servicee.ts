import { Injectable, inject } from "@angular/core";
import {
  HomePageApiService,
  HomePageUpdatePayload,
} from "./home-page.api.service";
import { HomePageStateService } from "./home-page.state.service";
import { tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class HomePageService {
  private httpService = inject(HomePageApiService);
  private state = inject(HomePageStateService);

  getAll() {
    return this.httpService.getAll().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setHomePageData(res.body);
        }
      })
    );
  }

  update(payload: HomePageUpdatePayload) {
    return this.httpService.update(payload).pipe(
      tap((res) => {
        this.state.updateHomePageData(res);
      })
    );
  }
}
