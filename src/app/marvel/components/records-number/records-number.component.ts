import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-records-number',
    templateUrl: './records-number.component.html',
    styleUrls: ['./records-number.component.scss']
  })
export class RecordsNumberComponent {
    @Input() recordsNum: number | undefined = 0;

}
