[![Build Status](https://travis-ci.org/mkftrivadis/sort-2.svg?branch=master)](https://travis-ci.org/mkftrivadis/sort-2)
# sort - **another AngularJS 2 sorting plugin**

This is the angularJS 2 version of the plugin [here](https://github.com/mkftrivadis/sort/blob/master/README.md)

### Dependencies
AngularJS 2.0
TypeScript 2.0.10+

### Installation
Include the files from the dist folder in your code. Also import the plugin main module in your own module.

```javascript
import { SortModule } from 'your_path/sort.module';
```
Finally import and declare the *Sort* and *SortProperty* directives in your module.

```javascript
import { SortDirective } from 'your_path/sort.directive';
import { SortPropertyDirective } from 'your_path/sortProperty.directive';
...
declarations: [SortDirective, SortPropertyDirective]
...
```

### Usage
The usage is almost the same as for the AngularJS 1.3.1+ version (see [here](https://github.com/mkftrivadis/sort#usage)). There are couple of things you need to remember though:

- Use the AngularJS new syntax and forget about the *sort-* prefix
```html
<div [sort]="data" (refresh)="myCustomSortingFunction($event)">
  <div [sortProperty]="'myHeader'"></div>
</div>
```
- The custom sort function should expect as only argument an object of type [Settings](https://github.com/mkftrivadis/sort-2/blob/master/app/settings.ts) which contains the parameters for sorting. To ensure that the sorting order is always set internally and through css, this function should always call *afterCustomSort* on the object after being done with the (asynchronous) sorting.
```html
<div [sort]="data" (refresh)="myCustomSortingFunction($event)">
...
</div>
```

```javascript
myCustomSortingFunction($event) {
  ...
  $event.afterCustomSort();
}
```
- Use the css classes *sort-asc* and *sort-desc* to customize the appearance of sorted headers.
- If you use a default sorting and a refresh function then you need to make sure that the initial data are sorted accordingly yourself. the plugin doesn't take care of it anymore since its only emits an event after which your function is called by AndularJS 2 itself. A possible setup might be the following.

```html
<div [sort]="data" (refresh)="myCustomSortingFunction($event)">
  <div [sortProperty]="'myHeader'" [default]="'desc'"></div>
</div>
```

```javascript
class MyComponent implements OnInit {
  ngOnInit() {
    // get your data in descending order here yourself since your html says [default]="'desc'"
  }
}
```

## License

Licensed under MIT.
