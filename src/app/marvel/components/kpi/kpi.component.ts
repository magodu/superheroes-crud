import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Superhero } from 'src/app/marvel/models/superhero.model';
import { KpiData, KpiMetric } from 'src/app/marvel/models/kpiData.model';

const INFINITE_VALUE = 9999999;

@Component({
    selector: 'app-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.scss'],
})
export class KpiComponent implements OnInit, OnChanges {
    @Input() data: Superhero[] | undefined;
    @Input() column!: string;
    @Input() maxResults!: number;

    kpiDataPercentages: KpiData[] = [];
    showMoreState = false;
    currentMaxResults: number = 0;

    showMore() {
        this.maxResults = INFINITE_VALUE;
        this.showMoreState = true;
    }

    showLess() {
        this.maxResults = this.currentMaxResults;
        this.showMoreState = false;
    }

    proccessKpiData() {
        const column = this.column as keyof Superhero;

        const counts: KpiMetric = this.data ? this.data.reduce<KpiMetric>((acc, item) => {
            const value = item[column];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {}) : {};

        const total: number = Object.values(counts).reduce((a, b) => a + b, 0);

        this.kpiDataPercentages = Object.entries(counts).map(([label, count]) => ({
                label,
                percentage: Math.round((count / total) * 100)
           }));

        this.kpiDataPercentages.sort((a, b) => b.percentage - a.percentage);
    }

    ngOnChanges() {
        this.proccessKpiData();
    }

    ngOnInit() {
        this.maxResults = this.maxResults <= 0 ? INFINITE_VALUE : this.maxResults;
        this.currentMaxResults = this.maxResults;
    }
}
