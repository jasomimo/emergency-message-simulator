import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'utcDate',
    standalone: true,
})
export class UtcDatePipe implements PipeTransform {
    transform(value: number): string | undefined {
        if (!value) {
            return;
        }

        if (typeof value !== 'number') {
            throw Error(`Expected timestamp (number), but got '${typeof value}'`);
        }
        return new Date(value).toISOString();
    }
}
