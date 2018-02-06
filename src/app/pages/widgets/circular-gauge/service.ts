import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class CircularGaugeService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('platform.fiwoo.eu/api/device-management/devices/historics?id=A81B6AA907B5&attribute=temperature&from=16-12-2017T00:00:00&to=17-01-2018T00:00:00')
            .catch(RuntimeService.handleError);
    }
}
