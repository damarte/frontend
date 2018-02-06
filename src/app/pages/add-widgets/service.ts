import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AddWidgetsService {

    constructor(private _http: HttpClient) {}

    getGadgetLibrary() {
        return this._http.get<WidgetsLibraryResponse>('/assets/api/widgets-library-model.json');
    }

}
