import { Component, Input, OnChanges } from '@angular/core';

import { Superhero } from 'src/app/marvel/models/superhero.model';
import { GraphicsData } from 'src/app/marvel/models/graphicsData.model';

@Component({
  selector: 'app-graphics-container',
  templateUrl: './graphics-container.component.html',
  styleUrls: ['./graphics-container.component.scss'],
})
export class GraphicsContainerComponent implements OnChanges {
    @Input() data: Superhero[] | undefined;
    @Input() column!: string;

    graphicData: GraphicsData[] = [];

    proccessGraphicData() {
        const column = this.column as keyof Superhero;

        this.graphicData =
            this.data && this.data.length > 0
                ? this.data.reduce<{ property: string; amount: number }[]>(
                    (acc, item) => {
                        const propertyValue = item[column];
                        const existingItem = acc.find(
                            (accItem) => accItem['property'] === propertyValue
                        );
                        if (existingItem) {
                            existingItem['amount'] += 1;
                        } else {
                            acc.push({ property: propertyValue, amount: 1 });
                        }
                        return acc;
                    }, [])
                : [];
    }

    ngOnChanges() {
        this.proccessGraphicData();
    }
}
