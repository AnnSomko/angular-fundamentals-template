import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null || value < 0) return '00:00 hour';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const hourLabel = hours > 1 ? 'hours' : 'hour';

    return `${hoursStr}:${minutesStr} ${hourLabel}`;
  }
}
