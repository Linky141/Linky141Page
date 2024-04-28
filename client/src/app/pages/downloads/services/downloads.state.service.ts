import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DownloadsData } from "../models/downloads.model";

const initialState = {
  downloads: [] as DownloadsData[],
};

type DownloadsStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class DownloadsStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setDownloadsData(data: DownloadsData[]) {
    this.state$.next({
      downloads: data,
    });
  }

  updateDownloadsData(data: DownloadsData) {
    const updatedData = this.state$.value.downloads.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      downloads: updatedData,
    });
  }

  updateDownloads(data: DownloadsData) {
    const updatedData = this.state$.value.downloads.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      downloads: updatedData,
    });
  }

  removeDownloads(id: DownloadsData["id"]) {
    const updatedData = this.state$.value.downloads.filter((res) => {
      return res.id !== id;
    });

    this.state$.next({
      downloads: updatedData,
    });
  }

  addDownloads(downloadsData: DownloadsData) {
    this.state$.next({
      downloads: [...this.state$.value.downloads, downloadsData],
    });
  }
}
