import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SuperheroCrudComponent } from '../../components/superhero-crud/superhero-crud.component';
import { SuperheroesService } from '../../services/superheroes.service';

import { CrudModes } from '../../enums/crudMode.enum';

@Component({
    selector: 'app-marvel-container',
    templateUrl: './marvel-container.component.html',
    styleUrls: ['./marvel-container.component.scss'],
})
export class MarvelContainerComponent {
    sectionTitle = 'Marvel Superheroes';

    constructor(private superheroesService: SuperheroesService, public dialog: MatDialog) { }

    openCreateDialog() {
        const dialogRef = this.dialog.open(SuperheroCrudComponent, {data: { mode: CrudModes.Create}});
    }
}
