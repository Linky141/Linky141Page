import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { DialogImage } from "./dialog-image.component";
import { ProjectData } from "./models/project.model";
import { NewImageDialog } from "./new-image-dialog.component";
import { ProjectDisableButtonsService } from "./services/disable-buttons.service";

@Component({
  selector: "app-project-edit-image",
  standalone: true,
  styles: ``,
  template: `
    <div class="flex justify-center items-center mb-5">
      <div
        class="flex justify-center flex-wrap mx-auto"
        style="max-width: 75%;"
      >
        @for (photo of state.photos; track $index) {
        <mat-card class="m-1">
          <div class="flex justify-center items-center m-2 w-52 h-52">
            <img
              (click)="openImage(photo)"
              src="{{ photo }}"
              alt="Image"
              class="max-w-52 max-h-52 rounded-2xl"
              style="object-fit: contain;"
            />
          </div>
          <button
            mat-fab
            color="warn"
            class="m-2"
            (click)="removePhoto(photo)"
            disabled="{{ disabledButtons }}"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </mat-card>
        }
        <div class="flex justify-center items-center m-2 w-52 h-72">
          <button
            mat-fab
            color="primary"
            class="m-2"
            (click)="addPhoto()"
            disabled="{{ disabledButtons }}"
          >
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class ProjectEditImageComponent {
  @Input() state!: ProjectData;

  private disableButtonsService = inject(ProjectDisableButtonsService);
  private dialog = inject(MatDialog);

  disabledButtons = false;

  ngOnInit() {
    this.disableButtonsService.state$.subscribe((state) => {
      this.disabledButtons = state;
    });
  }

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }

  addPhoto() {
    const dialogRef = this.dialog.open(NewImageDialog, { data: { url: "" } });
    dialogRef.afterClosed().subscribe((res) => {
      this.state.photos = [...this.state.photos, res];
    });
  }

  removePhoto(photo: string) {
    this.state.photos = this.state.photos.filter((p) => p !== photo);
  }
}
