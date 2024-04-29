import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDateTime",
  standalone: true,
})
export class CustomDateTimePipe implements PipeTransform {
  transform(value: number) {
    return new Intl.DateTimeFormat("pl", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(value);
  }
}
