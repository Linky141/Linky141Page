import { Injectable, inject } from "@angular/core";
import { HomePageData } from "../models/home-page.model";
import { HttpClient } from "@angular/common/http";

export type HomePageUpdatePayload = { title?: string; content?: string };

@Injectable({
  providedIn: "root",
})
export class HomePageApiService {
  private http = inject(HttpClient);

  private baseURL = "http://localhost:3000";

  getAll() {
    return this.http.get<HomePageData[]>(`${this.baseURL}/homePageData`, {
      observe: "response",
    });

    // const url = new URL("/homePageData", this.baseURL);
    // return this.http.get<HomePageData[]>(url.href);
  }

  update(payload: HomePageUpdatePayload) {
    return this.http.patch<HomePageData>(
      `${this.baseURL}/homePageData/1`,
      payload
    );
    // return this.http.patch<HomePageData>(
    //   `${this.baseURL}/homePageData/1`,
    //   payload
    // );
  }
}
