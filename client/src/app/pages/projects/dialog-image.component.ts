import { Component, Inject } from "@angular/core";
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogImageData {
  url: string;
}

@Component({
  selector: "dialog-image",
  template: `
    <mat-dialog-content class="overflow-auto">
      <img src="{{ data.url }}" class="max-w-none block" />
    </mat-dialog-content>
  `,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogImage {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogImageData) {}
}
