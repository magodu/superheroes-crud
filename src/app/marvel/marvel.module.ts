import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MarvelRoutingModule } from './marvel-routing.module';

import { MarvelContainerComponent } from './containers/marvel-container/marvel-container.component';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SuperheroesService } from './services/superheroes.service';
import { SuperheroesFilterComponent } from './components/superheroes-filter/superheroes-filter.component';
import { SuperheroesTableComponent } from './components/superheroes-table/superheroes-table.component';
import { SuperheroDetailComponent } from './components/superhero-detail/superhero-detail.component';
import { SuperheroCrudComponent } from './components/superhero-crud/superhero-crud.component';
import { GraphicsContainerComponent } from './containers/graphics-container/graphics-container.component';
import { GraphicBarChartComponent } from './components/graphic-bar-chart/graphic-bar-chart.component';
import { GraphicPieChartComponent } from './components/graphic-pie-chart/graphic-pie-chart.component';

import { TitlePipe } from './pipes/title.pipe';
import { RecordsNumberComponent } from './components/records-number/records-number.component';
import { KpiComponent } from './components/kpi/kpi.component';

@NgModule({
    declarations: [
        MarvelContainerComponent,
        SuperheroesListComponent,
        SuperheroesFilterComponent,
        SuperheroesTableComponent,
        SuperheroDetailComponent,
        SuperheroCrudComponent,
        TitlePipe,
        GraphicsContainerComponent,
        GraphicBarChartComponent,
        GraphicPieChartComponent,
        RecordsNumberComponent,
        KpiComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MarvelRoutingModule
    ],
    providers: [SuperheroesService, TitlePipe],
})

export class MarvelModule {}
