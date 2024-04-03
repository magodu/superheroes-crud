import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-superheroes-filter',
    templateUrl: './superheroes-filter.component.html',
    styleUrls: ['./superheroes-filter.component.scss'],
})
export class SuperheroesFilterComponent implements OnInit {
    private _data = new BehaviorSubject<string[]>([]);

    @Input()
    set data(value) {
        this._data.next(value);
    };

    get data() {
        return this._data.getValue();
    }

    @Output() selectedHeroes: EventEmitter<string[]> = new EventEmitter();

    superheroesNameList: string[] = [];
    nameCtrl = new FormControl('');
    filteredSuperheroes: Observable<string[]> | undefined;
    superheroes: string[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement> | undefined;

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.superheroesNameList.filter((name) =>
            name.toLowerCase().includes(filterValue)
        );
    }

    private _setFilteredSuperheroes() {
        return this.nameCtrl.valueChanges.pipe(
            startWith(null),
            map((name: string | null) =>
                name ? this._filter(name) : this.superheroesNameList.slice()
            )
        );
    }

    sendData(): void {
        this.selectedHeroes.emit(this.superheroes);
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our superheroes
        if (value) {
            this.superheroes.push(value);
            this.sendData();
        }

        // Clear the input value
        event.chipInput!.clear();

        this.nameCtrl.setValue(null);
    }

    remove(name: string): void {
        const index = this.superheroes.indexOf(name);

        if (index >= 0) {
            this.superheroes.splice(index, 1);
            this.sendData();
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.superheroes.push(event.option.viewValue);
        this.nameInput!.nativeElement.value = '';
        this.nameCtrl.setValue(null);

        this.sendData();
    }

    ngOnInit() {
        this._data
            .subscribe((data: string[]) => {
                this.superheroesNameList = data;
                this.filteredSuperheroes = this.nameCtrl.valueChanges.pipe(
                    startWith(null),
                    map((name: string | null) =>
                        name ? this._filter(name) : this.superheroesNameList.slice()
                    )
                );
            });
    }
}
