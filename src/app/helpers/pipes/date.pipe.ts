import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({ name: "customDate" })
export class CustomDate implements PipeTransform {
  transform(
    date: number | string,
    format: string = "dd-MM-yyyy"
  ): string {
    return new DatePipe("en-US").transform(date, format) || "";
  }
}
