import { Injectable } from "@angular/core";
import { HomePageData } from "../../../models/home-page.model";
import { BehaviorSubject } from "rxjs";

const initialState = {
  homePage: [] as HomePageData[],
};

type HomePageStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class HomePageStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setHomePageData(data: HomePageData[]) {
    this.state$.next({
      homePage: data,
    });
  }

  updateHomePageData(data: HomePageData) {
    const updatedData = this.state$.value.homePage.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      homePage: updatedData,
    });
  }
}
