import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import Chart from 'chart.js/auto';

import { TitlePipe } from 'src/app/marvel/pipes/title.pipe';
import { GraphicsData } from 'src/app/marvel/models/graphicsData.model';

@Component({
    selector: 'app-graphic-pie-chart',
    templateUrl: './graphic-pie-chart.component.html',
    styleUrls: ['./graphic-pie-chart.component.scss']
})

export class GraphicPieChartComponent implements AfterViewInit, OnChanges {
    @Input() data!: GraphicsData[];
    @Input() column!: string;
    @ViewChild('chartCanvas') chartCanvas!: ElementRef;

    chart: any;
    labels: string[] = [];
    dataValues: number[] = [];

    constructor(private cd: ChangeDetectorRef, private titlePipe: TitlePipe) {}

    private updateData() {
        if (this.chartCanvas) {
            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(this.chartCanvas.nativeElement, {
                type: 'pie',
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: this.titlePipe.transform(this.column),
                            data: this.dataValues
                        }
                    ]
                },
                options: {
                    aspectRatio: 2.5,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    private createChart() {
        const canvasId = `chart-${this.column}`;
        this.chartCanvas.nativeElement.id = canvasId;

        this.updateData();
    }

    ngAfterViewInit() {
        this.labels = this.data?.map((o) => o.property);
        this.dataValues = this.data?.map((o) => o.amount);
        this.createChart();
        this.cd.detectChanges();
    }

    ngOnChanges() {
        this.labels = this.data?.map((o) => o.property);
        this.dataValues = this.data?.map((o) => o.amount);
        this.updateData();
    }
}
