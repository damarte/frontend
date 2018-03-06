import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LineChartService {
    static seedData() {

        const array = [];
        for (let i = 0; i < 25; i++) {
            array.push({
                'name': i.toString(),
                'value': 0
            });
        }
        return array;
    }
    static retrieveData() {

        const currentDate = new Date();
        const time = LineChartService.getDay(
            currentDate.getDay()) + ':' +
            currentDate.getHours() + ':' +
            currentDate.getMinutes() + ':' +
            currentDate.getSeconds();

        return {

            'name': time,
            'value': LineChartService.getRandomArbitrary(5, 20)
        };

    }
    static getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static getDay(dayOfWeek: number) {

        switch (dayOfWeek) {
            case 0:
                return 'sun';
            case 1:
                return 'mon';
            case 2:
                return 'tue';
            case 3:
                return 'wed';
            case 4:
                return 'thur';
            case 5:
                return 'fri';
            case 6:
                return 'sat';
        }
    }

    constructor() {
    }

    public get(collectors: any[]) {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {

                const data = [];
                collectors.forEach(collector => {
                    data.push(LineChartService.retrieveData());
                });

                observer.next(data);
            });
        });
    }

    public stop(subscription: any) {
        subscription.unsubscribe();
    }


}

export class Coordinate  {
    arg: string;
    val: number;
}
