import { NgModule } from '@angular/core';
import { SortDirective } from './sort.directive';
import { SortPropertyDirective } from './sortProperty.directive';

/**
 * @description
 * `SortModule` provides simple sorting functionalities for tabular data
 * 
 * @export
 * @class SortModule
 */
@NgModule({
  declarations: [SortDirective, SortPropertyDirective],
  exports: [SortDirective, SortPropertyDirective]
})  
export class SortModule { }
