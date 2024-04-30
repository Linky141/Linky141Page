import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DownloadsDeletingIdService {
  private deletingState = new BehaviorSubject<string>("-1");
  deletingState$ = this.deletingState.asObservable();

  updateDeletingState(id: string) {
    this.deletingState.next(id);
  }
}
