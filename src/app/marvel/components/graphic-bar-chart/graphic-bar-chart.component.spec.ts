import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChangeDetectorRef } from '@angular/core';
import { GraphicBarChartComponent } from './graphic-bar-chart.component';
import { TitlePipe } from 'src/app/marvel/pipes/title.pipe';

import { GraphicsData } from 'src/app/marvel/models/graphicsData.model';

describe('GraphicBarChartComponent', () => {
    let component: GraphicBarChartComponent;
    let fixture: ComponentFixture<GraphicBarChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SharedModule
            ],
            declarations: [ GraphicBarChartComponent ],
            providers: [
                { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } },
                { provide: TitlePipe, useValue: { transform: (value: string) => value } }
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(GraphicBarChartComponent);
        component = fixture.componentInstance;
        component.chartCanvas = { nativeElement: document.createElement('canvas') };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should process data correctly', fakeAsync(() => {
        const testData: GraphicsData[] = [
            { property: 'Test', amount: 10 },
            { property: 'Test2', amount: 20 }
        ];

        component.data = testData;
        component.column = 'testColumn';
        fixture.detectChanges();
        tick();
        component.ngAfterViewInit();

        fixture.detectChanges();
        expect(component.labels).toEqual(['Test', 'Test2']);
        expect(component.dataValues).toEqual([10, 20]);
    }));

});
