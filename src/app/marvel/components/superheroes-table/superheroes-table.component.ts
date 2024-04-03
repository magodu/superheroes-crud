import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { SuperheroDetailComponent } from '../superhero-detail/superhero-detail.component';
import { SuperheroCrudComponent } from '../superhero-crud/superhero-crud.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ConfirmationPromptComponent } from 'src/app/shared/components/confirmation-prompt/confirmation-prompt.component';

import { Superhero } from 'src/app/marvel/models/superhero.model';
import { CrudData } from 'src/app/marvel/models/crudData.model';
import { CrudModes } from 'src/app/marvel/enums/crudMode.enum';

import { STORAGE_KEY } from 'src/app/shared/constants';

@Component({
    selector: 'app-superheroes-table',
    templateUrl: './superheroes-table.component.html',
    styleUrls: ['./superheroes-table.component.scss'],
})
export class SuperheroesTableComponent implements OnInit, OnDestroy {
    private refreshSubscription!: Subscription;
    private dialogSubscription!: Subscription;
    private retrieveDataSubscription!: Subscription;

    displayedColumns: string[] = [
        'nameLabel',
        'skillsLabel',
        'occupationLabel',
        'memberOfLabel',
        'genderLabel',
        'citizenshipLabel',
        'creatorLabel',
        'actions'
    ];
    superheroesList: Superhero[] = [];
    superheroesFilteredList: Superhero[] = [];
    superheroesNameList: string[] = [];
    url = '/assets/data/wikipedia_marvel_data.json';

    constructor(private superheroesService: SuperheroesService, private localStorageService: LocalStorageService, public dialog: MatDialog) {
        this.refreshSubscription = this.superheroesService.refreshListData.subscribe(result => {
            let updatedData: Superhero[] = [];
            switch (result.mode) {
                default:
                case CrudModes.Create:
                    updatedData = [ result.data, ...this.superheroesList];
                    break;
                case CrudModes.Edit:
                    updatedData = this.superheroesList.map(superhero =>
                        superhero.nameLabel === result.data.nameLabel ? result.data : superhero
                    );
                    break;
                case CrudModes.Delete:
                    updatedData = this.superheroesList.filter(superhero => superhero.nameLabel !== result.data.nameLabel);
            }

            this.superheroesList = [ ...updatedData];
            this.superheroesFilteredList = [ ...updatedData];
            this.superheroesNameList = updatedData.map(o => o.nameLabel);
            this.setDataInLocalStorage(updatedData);

        });
    }

    filterItems(data: string[]): void {
        this.superheroesFilteredList = data.length === 0 ? [ ...this.superheroesList] : this.superheroesList.filter(superhero => data.includes(superhero.nameLabel));
    }

    showDetail(detail: Superhero) {
        this.dialog.open(SuperheroDetailComponent, {
            data: detail
        });
    }

    editSuperhero(superhero: Superhero) {
        this.dialog.open(SuperheroCrudComponent, {
            data: {
                mode: CrudModes.Edit,
                data: superhero
            }
        });
    }

    deleteSuperhero(superhero: Superhero) {
        const dialogRef = this.dialog.open(ConfirmationPromptComponent);

        this.dialogSubscription = dialogRef.afterClosed().subscribe((choice: boolean) => {
            if (choice) {
                const data: CrudData = {
                    mode: CrudModes.Delete,
                    data: superhero
                };
                this.superheroesService.refreshList(data);
            }
        });
    }

    private setDataInLocalStorage(data: Superhero[]) {
        this.localStorageService.setItem(STORAGE_KEY, data);
    }

    private getData() {
        this.retrieveDataSubscription = this.superheroesService.getSuperheroesData(this.url).subscribe({
            next: (response: Superhero[]) => {
                this.superheroesList = response;
                this.superheroesFilteredList = response;
                this.superheroesNameList = response.map(o => o.nameLabel);
                this.setDataInLocalStorage(response);
            },
            error: (error: any) => {
                console.error(error);
            },
        });
    }

    ngOnInit() {
        this.getData();
    }

    ngOnDestroy() {
        this.refreshSubscription && this.refreshSubscription.unsubscribe();
        this.dialogSubscription && this.dialogSubscription.unsubscribe();
        this.retrieveDataSubscription && this.retrieveDataSubscription.unsubscribe();
    }
}
