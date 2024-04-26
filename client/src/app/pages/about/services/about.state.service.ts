import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AboutData } from "../../../models/about.model";

const initialState = {
  homePage: [] as AboutData[],
};

type AboutStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class AboutStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setHomePageData(data: AboutData[]) {
    this.state$.next({
      homePage: data,
    });
  }

  updateHomePageData(data: AboutData) {
    const updatedData = this.state$.value.homePage.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      homePage: updatedData,
    });
  }
}
