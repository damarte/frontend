import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';

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
    constructor(private _http: HttpClient) {
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

    getHelpTopic() {

        return this._http.get('/assets/api/trendline-help-model.json')
            .catch(RuntimeService.handleError);

    }
}



export class Month {
    id: number;
    name: string;
}

let months: Month[] = [{
    id: 1,
    name: "January"
}, {
    id: 2,
    name: "February"
}, {
    id: 3,
    name: "March"
}, {
    id: 4,
    name: "April"
}, {
    id: 5,
    name: "May"
}, {
    id: 6,
    name: "June"
}, {
    id: 7,
    name: "July"
}, {
    id: 8,
    name: "August"
}, {
    id: 9,
    name: "September"
}, {
    id: 10,
    name: "October"
}, {
    id: 11,
    name: "November"
}, {
    id: 12,
    name: "December"
}];

@Injectable()
export class Service {
    getMonths(): Month[] {
        return months;
    }
}
