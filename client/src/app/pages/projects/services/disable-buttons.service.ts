import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectDisableButtonsService {
  private state = new BehaviorSubject<boolean>(false);
  state$ = this.state.asObservable();

  updateState(state: boolean) {
    this.state.next(state);
  }
}
