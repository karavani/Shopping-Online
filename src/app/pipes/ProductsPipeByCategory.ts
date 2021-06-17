import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
    name: 'sortByCategoryPipe'
})
export class ProductsPipeByCategory implements PipeTransform {

    transform(products: Product[]): any {
        return products.sort((a, b) => a.categoryID - b.categoryID);
    }
}
