import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DialogImageData } from "./dialog-image.component";
import { TranslationService } from "../../services/translation.service";

export interface DialogNewImageData {
  url: string;
}

@Component({
  selector: "dialog-image",
  template: `
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>{{ translationService.t("imageurl") }}</mat-label>
        <input matInput [(ngModel)]="data.url" name="url" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">
        {{ translationService.t("cancel") }}
      </button>
      <button mat-button [mat-dialog-close]="data.url" cdkFocusInitial>
        {{ translationService.t("add") }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class NewImageDialog {
  translationService = inject(TranslationService);

  constructor(
    public dialogRef: MatDialogRef<NewImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogNewImageData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
