import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {

    transform(value: string): string {
        if (typeof value !== 'string') {
            return '';
        }

        const replacedValue = value.replace('Label', '');
        return replacedValue.charAt(0).toUpperCase() + replacedValue.slice(1);
    }
}
