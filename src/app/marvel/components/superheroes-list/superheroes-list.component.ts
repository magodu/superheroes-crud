import { Component, Input, Output, OnInit, AfterViewInit, OnChanges, OnDestroy, ViewChild, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Superhero } from 'src/app/marvel/models/superhero.model';

interface ViewContext<T>{
    $implicit: T;
}

@Component({
    selector: 'app-superheroes-list',
    templateUrl: './superheroes-list.component.html',
    styleUrls: ['./superheroes-list.component.scss'],
})
export class SuperheroesListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private subscription!: Subscription;
    private _data = new BehaviorSubject<Superhero[]>([]);

    @Input()
    set data(value) {
        this._data.next(value);
    };

    get data() {
        return this._data.getValue();
    }

    @Input() displayedColumns: string[] = [];
    @Output() detail: EventEmitter<Superhero> = new EventEmitter();
    @Output() edit: EventEmitter<Superhero> = new EventEmitter();
    @Output() delete: EventEmitter<Superhero> = new EventEmitter();

    @ViewChild(MatSort) sort!: MatSort;

    @ContentChild(TemplateRef) actionsRef!: TemplateRef<any>;

    graphicSubheaders = [
        { column: 'skillsLabel', name: 'skills' },
        { column: 'occupationLabel', name: 'occupation' },
        { column: 'memberOfLabel', name: 'memberOf' },
        { column: 'genderLabel', name: 'gender' },
        { column: 'citizenshipLabel', name: 'citizenship' },
        { column: 'creatorLabel', name: 'creator' }
    ];
    subheaderGraphicsContainers: string[] = [];
    subheaderKpisContainers: string[] = [];

    dataSource: any;
    superheroesList: Superhero[] | undefined;

    getActionsViewContext(superhero: Superhero): ViewContext<any> {
        return {$implicit: superhero};
    }

    showDetail(superhero: Superhero) {
        this.detail.emit(superhero);
    }

    announceSortChange(sortState: Sort) {
        // console.log(`Sorted ${sortState.direction}ending`);
    }

    generateSubheaderContainers() {
        this.subheaderGraphicsContainers = ['items-number-subheader', ...this.graphicSubheaders.map(subheader => 'graphic-' + subheader.name + '-subheader'), 'empty-subheader'];
        this.subheaderKpisContainers = ['empty-subheader', ...this.graphicSubheaders.map(subheader => 'kpi-' + subheader.name + '-subheader'), 'empty-subheader'];
    }

    ngOnInit() {
        this.generateSubheaderContainers();

        this.subscription = this._data.subscribe((data: Superhero[]) => {
            this.superheroesList = data;
            this.dataSource = new MatTableDataSource(this.superheroesList!);
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    ngOnChanges() {
        if (this.dataSource) {
            this.dataSource.sort = this.sort;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
