import { HomePageData } from "../models/home-page.model";

type IdleState = {
  state: LIST_STATE_VALUE["IDLE"];
};
type LoadingState = {
  state: LIST_STATE_VALUE["LOADING"];
};
type SuccessState<T> = {
  state: LIST_STATE_VALUE["SUCCESS"];
  result: T[];
};
type ErrorState = {
  state: LIST_STATE_VALUE["ERROR"];
  error: FetchingError;
};

type LIST_STATE_VALUE = typeof LIST_STATE_VALUE;

export const LIST_STATE_VALUE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type FetchingError = { status: number; message: string };

export type ListStateValue = keyof typeof LIST_STATE_VALUE;

export type PageState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;
