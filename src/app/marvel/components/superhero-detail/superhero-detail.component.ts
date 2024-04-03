import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Superhero } from 'src/app/marvel/models/superhero.model';

@Component({
    selector: 'app-superhero-detail',
    templateUrl: './superhero-detail.component.html',
    styleUrls: ['./superhero-detail.component.scss'],
})
export class SuperheroDetailComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Superhero) {}

}
