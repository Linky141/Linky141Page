import { Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-loading",
  standalone: true,
  styles: [``],
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="flex justify-center items-center flex-col h-[90vh]">
      <div class="flex justify-center items-center flex-col">
        <mat-spinner />
        <h1 class="text-3xl mt-5">{{ text }}</h1>
      </div>
    </div>
  `,
})
export class LoadingPageComponent {
  @Input() text?: string;
}
