import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of, Subject } from 'rxjs';

import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { Superhero } from '../models/superhero.model';
import { CrudData } from '../models/crudData.model';

import { STORAGE_KEY } from 'src/app/shared/constants';

@Injectable()
export class SuperheroesService {
    private _refreshListData = new Subject<CrudData>();

    get refreshListData() {
        return this._refreshListData;
    }

    constructor(private httpService: HttpService, private localStorageService: LocalStorageService) { }

    refreshList(data: CrudData): void {
        this._refreshListData.next(data);
    }

    private getSuperheroesFromUrl(url: string): Observable<Superhero[]> {
        return this.httpService.getVerb<Superhero[]>(url);
    }

    getSuperheroesData(url: string): Observable<Superhero[]> {
        const superheroesData = this.localStorageService.getItem(STORAGE_KEY);

        if (superheroesData) {
            return of(superheroesData);
        } else {
            return this.getSuperheroesFromUrl(url);
        }
    }
}
