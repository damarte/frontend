import {
    Injectable
} from '@angular/core';

export class Product {
    name: string;
    count: number;
    active: boolean;
}

let products: Product[] = [{
    name: 'Floor 1',
    count: 32,
    active: true
}, {
    name: 'Floor 2',
    count: 23,
    active: true
}, {
    name: 'Floor 3',
    count: 19,
    active: true 
}, {
    name: 'Floor 4',
    count: 15,
    active: true
}];

@Injectable()
export class Service {
    getProducts(): Product[] {
        return products;
    }
}