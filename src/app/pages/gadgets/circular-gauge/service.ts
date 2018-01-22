import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class CircularGaugeService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('../../plugins/procmon/components/gadgets/trend/model.json')
            .catch(RuntimeService.handleError);
    }
}
