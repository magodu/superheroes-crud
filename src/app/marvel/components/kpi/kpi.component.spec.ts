import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';

import { KpiComponent } from './kpi.component';
import { Superhero } from 'src/app/marvel/models/superhero.model';

describe('KpiComponent', () => {
    let component: KpiComponent;
    let fixture: ComponentFixture<KpiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [ KpiComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(KpiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display KPI data correctly', fakeAsync(() => {
        const testData: Superhero[] = [{
            citizenshipLabel: 'test',
            creatorLabel: 'test',
            genderLabel: 'test',
            memberOfLabel: 'test',
            nameLabel: 'test',
            occupationLabel: 'test',
            skillsLabel: 'test'
        },{
            citizenshipLabel: 'test2',
            creatorLabel: 'test2',
            genderLabel: 'test2',
            memberOfLabel: 'test2',
            nameLabel: 'test2',
            occupationLabel: 'test2',
            skillsLabel: 'test2'
        }];

        component.data = testData;
        component.column = 'skillsLabel';
        component.maxResults = 2;
        fixture.detectChanges();

        component.proccessKpiData();

        tick();
        console.log("KpiComponent",component.kpiDataPercentages);
        fixture.detectChanges();
        const metrics = fixture.debugElement.queryAll(By.css('.metric'));
        expect(metrics.length).toBe(2);
    }));
});
