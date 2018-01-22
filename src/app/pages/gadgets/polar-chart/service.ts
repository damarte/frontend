/**
 * Created by jayhamilton on 6/24/17.
 */

import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {LineChartService} from '../line-chart/service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class PolarChartService {

    private apiToken: string;
    private apiTokenHeader: string;
    private apiBaseAddress: string;
    private apiBasePath: string;
    private headers: HttpHeaders;

    private aggregateSuffix = '?action=aggregate';
    private objectQuerySuffix = '?pageStartIndex=0&pageSize=100&embed=(children(properties))';

    private passAPI: string;
    private warnAPI: string;
    private toDoAPI: string;

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/disk-model.json')
            .catch(RuntimeService.handleError);
    }

    getHelpTopic() {

        return this._http.get('/assets/api/disk-help-model.json')
            .catch(RuntimeService.handleError);
    }

    getMockData(valueLabel1, valueLabel2) {
        return new Observable(observer => {
            Observable.timer(500, 30000).subscribe(t => {

                const val1 = LineChartService.getRandomArbitrary(0, 100);
                const val2 = 100 - val1;

                const data = [
                    {
                        'name': valueLabel1,
                        'value': val1
                    },
                    {
                        'name': valueLabel2,
                        'value': val2
                    }
                ];
                observer.next(data);
            });
        });
    }

    poll() {
        return new Observable(observer => {
            Observable.timer(500, 10000).subscribe(t => {
                observer.next();
            });
        });
    }


    getPassCount() {

        /**
         * todo - this is specific to a certain implementation
         */
        const body = {
            'op': [
                {
                    'operation': 'count',
                    'fieldname': 'pk',
                    'outputname': 'count'
                }],
            'group':
                ['protectionInfo.storageProfileName']
        };

        return this._http.post(this.apiBaseAddress
            + this.apiBasePath
            + this.passAPI.trim()
            + this.aggregateSuffix,
            body, {headers: this.headers});
    }

    getPassObjects() {

        return this._http.get(this.apiBaseAddress
            + this.apiBasePath
            + this.passAPI.trim()
            + this.objectQuerySuffix,
            {headers: this.headers});
    }

    getWarnCount() {

        /**
         * todo  - this is specific to a certain implementation
         */
        const body = {
            'op': [
                {
                    'operation': 'count',
                    'fieldname': 'pk',
                    'outputname': 'count'
                }]
        };

        return this._http.post(this.apiBaseAddress
            + this.apiBasePath + this.warnAPI.trim()
            + this.aggregateSuffix, body,
            {headers: this.headers});

    }

    getWarnObjects() {

        return this._http.get(this.apiBaseAddress
            + this.apiBasePath
            + this.warnAPI.trim()
            + this.objectQuerySuffix,
            {headers: this.headers});

    }

    getToDoCount() {

        /**
         * todo  - this is specific to a certain implementation
         */
        const body = {
            'op': [
                {
                    'operation': 'count',
                    'fieldname': 'pk',
                    'outputname': 'count'
                }]
        };

        return this._http.post(this.apiBaseAddress
            + this.apiBasePath
            + this.toDoAPI.trim()
            + this.aggregateSuffix,
            body, {headers: this.headers});

    }

    getTodoObjects() {

        const todoAPI = '/api/hypervisor/1004/vm';

        let params = new HttpParams();

        /**
         * todo - this is specific to a certain implementation
         */
        params = params.append('sort', '[{"property": "name", "direction": "ASC"}]');
        params = params.append('from', 'hlo');
        params = params.append('pageSize', 100 + '');

        return this._http.get(this.apiBaseAddress + todoAPI,
            {
                headers: this.headers,
                params: params
            });

    }

    processObjects(objects: Array<any>) {

        // pass objects to process API

    }

    setAPIBaseDetails(apiToken: string, apiTokenHeader: string, apiBaseAddress: string, apiBasePath: string) {

        this.apiToken = apiToken;
        this.apiTokenHeader = apiTokenHeader;
        this.apiBaseAddress = apiBaseAddress;
        this.apiBasePath = apiBasePath;

        this.headers = new HttpHeaders();

        this.headers = this.headers.append('Content-Type', 'application/json');
        this.headers = this.headers.append(this.apiTokenHeader, this.apiToken);

    }

    setAPIs(passAPI: string, warnAPI: string, todoAPI: string) {
        this.passAPI = passAPI;
        this.warnAPI = warnAPI;
        this.toDoAPI = todoAPI;
    }

}


export class Production {
    arg: string;
    apples: number;
    grapes: number;
    lemons: number;
    oranges: number;
}

let productionData: Production[] = [{
    arg: "Floor 1",
    apples: 4.21,
    grapes: 6.22,
    lemons: 0.8,
    oranges: 7.47
}, {
    arg: "Floor 2",
    apples: 3.33,
    grapes: 8.65,
    lemons: 1.06,
    oranges: 5
}, {
    arg: "Floor 3",
    apples: 2.6,
    grapes: 4.25,
    lemons: 0.78,
    oranges: 1.71
}, {
    arg: "Floor 4",
    apples: 2.2,
    grapes: 7.78,
    lemons: 0.52,
    oranges: 2.39
}, {
    arg: "Floor 5",
    apples: 2.16,
    grapes: 2.26,
    lemons: 3.09,
    oranges: 6.26
}];

@Injectable()
export class Service {
    getProductionData(): Production[] {
        return productionData;
    }
}
