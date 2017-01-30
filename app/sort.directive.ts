import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from './settings';
import { ASC, DATE } from './constants';

/**
 * @ngModule
 *
 * @howToUse
 * <parent-node [sort]="component_property_which_points_to_an_array_of_objects"
 *              (refresh)="method($event)">
 *   ...
 * </parent-node>
 *
 * @description
 *  `sort` declares a sorting header for tabular data
 * 
 * @export
 * @class SortDirective
 */
@Directive({ selector: '[sort]' })
export class SortDirective {
  @Input('sort') data: Array<Object>;

  /**
   * @description
   * custom sort function. This function is called when the user clicks on a header which is declared
   * through {@link `sortProperty`}.
   * Note that you have to call {@link `afterCustomSort`} on the event object after you've finish with sorting.
   * 
   * @memberOf SortDirective
   */
  @Output() refresh = new EventEmitter<Settings>();

  constructor(private elementRef: ElementRef) {
  }

  /**
   * @description
   * default sorting function. This function will not be used if a custom sorting function is provided through
   * 
   * @param {Settings} settings
   * 
   * @memberOf SortDirective
   */
  sort(settings: Settings) {
    if (this.data && this.data.length > 0) {
      if (settings.type === DATE) {
        this.data.sort((a, b) => {
          let comparison = new Date(b[settings.property]).getTime() - new Date(a[settings.property]).getTime();

          return settings.order === ASC ? -comparison : comparison;
        });
      } else {
        this.data.sort((a, b) => {
          if (settings.preset && settings.preset.length > 0) {
            return settings.order === ASC ? settings.preset.indexOf(a[settings.property]) - settings.preset.indexOf(b[settings.property])
              : settings.preset.indexOf(b[settings.property]) - settings.preset.indexOf(a[settings.property]);
          }

          if (a[settings.property] > b[settings.property]) {
            return settings.order === ASC ? 1 : -1;
          } else if (a[settings.property] < b[settings.property]) {
            return settings.order === ASC ? -1 : 1;
          } else {
            return 0;
          }
        });
      }
      settings.afterCustomSort();
    }
  }
}
