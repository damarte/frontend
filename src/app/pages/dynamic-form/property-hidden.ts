import { PropertyBase } from './property-base';


export class HiddenProperty extends PropertyBase<string> {

    controlType = 'hidden';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = 'hidden';
    }

}
