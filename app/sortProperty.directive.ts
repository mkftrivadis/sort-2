import { Directive, ElementRef, EventEmitter, Host, Input, OnDestroy, OnInit, Output, Renderer } from '@angular/core';
import { SortDirective } from './sort.directive';
import { ASC, DESC, ASCCLASS, DESCCLASS } from './constants';

/**
 * @ngModule SortModule
 *
 * @howToUse
 * ```
 * <parent-node [sort]="see {@link `sort`}">
 *   <any-node  [sortProperty]="property_name"
 *              [type]="'date'"
 *              [default]="'asc' | 'desc'"
 *              [preset]="component_property_which_points_to_an_array"></any-node>
 * </parent-node>
 * ```
 *
 * @description
 * `sortProperty` declares a sorting property on the sort directive
 * 
 * @export
 * @class SortPropertyDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({ selector: '[sortProperty]'})
export class SortPropertyDirective implements OnInit, OnDestroy {
  private _order: string;
  private listenFunc: Function;

  @Input() sortProperty: string;
  @Input() type: string;
  @Input() default: string;
  @Input() preset: Array<Object>;

  @Output() orderChange = new EventEmitter<string>();

  set nextOrder(newOrder: string) {
    this._order = newOrder;
  };
  get nextOrder(): string {
    return this._order || ASC;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer, @Host() private container: SortDirective) {
  }

  ngOnInit() {
    this.listenFunc = this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      this.toggleOrder();
    });

    if (this.default && this.container.refresh.observers.length === 0) {
      this.nextOrder = this.default;
      this.toggleOrder();
    }
  }

  ngOnDestroy() {
    this.listenFunc();
  }

  toggleOrder() {
    let settings = {
      property: this.sortProperty, order: this.nextOrder, type: this.type, default: this.default, preset: this.preset,
      afterCustomSort: () => {
        if (this.nextOrder === ASC) {
          this.nextOrder = DESC;
          this.renderer.setElementClass(this.elementRef.nativeElement, DESCCLASS, false);
          this.renderer.setElementClass(this.elementRef.nativeElement, ASCCLASS, true);
        } else if (this.nextOrder === DESC) {
          this.nextOrder = ASC;
          this.renderer.setElementClass(this.elementRef.nativeElement, ASCCLASS, false);
          this.renderer.setElementClass(this.elementRef.nativeElement, DESCCLASS, true);
        }
      }
    };

    if (this.container.refresh.observers.length > 0) {
      this.container.refresh.emit(settings);
    } else {
      this.container.sort(settings);
    }
  }
}
