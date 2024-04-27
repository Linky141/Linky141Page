import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AboutData } from "../../../models/about.model";

const initialState = {
  about: [] as AboutData[],
};

type AboutStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class AboutStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setAboutData(data: AboutData[]) {
    this.state$.next({
      about: data,
    });
  }

  updateAboutData(data: AboutData) {
    const updatedData = this.state$.value.about.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      about: updatedData,
    });
  }
}
