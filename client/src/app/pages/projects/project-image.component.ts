import { Component, Input, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogImage } from "./dialog-image.component";
import { ProjectData } from "./models/project.model";

@Component({
  selector: "app-project-image",
  standalone: true,
  styles: ``,
  template: `
    <div class="flex justify-center items-center mb-5">
      <div
        class="flex justify-center flex-wrap mx-auto"
        style="max-width: 75%;"
      >
        @for (photo of state.photos; track $index) {
        <div class="flex justify-center items-center m-1 w-52 h-52">
          <img
            (click)="openImage(photo)"
            src="{{ photo }}"
            alt="Image"
            class="max-w-52 max-h-52 rounded-2xl"
            style="object-fit: contain;"
          />
        </div>
        }
      </div>
    </div>
  `,
  imports: [],
})
export class ProjectImageComponent {
  @Input() state!: ProjectData;

  dialog = inject(MatDialog);

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }
}
