import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from './index';

import { ASC, ASCCLASS, DATE, DESC, DESCCLASS } from './constants';
import { SortDirective } from './sort.directive';
import { SortPropertyDirective } from './sortProperty.directive';

@Component({
  template:
  `<div [sort]="data">
     <div [sortProperty]="'test'"></div>
     <div [sortProperty]="'testType'" [type]="'date'"></div>
     <div [sortProperty]="'testDefault'" [default]="'desc'"></div>
     <div [sortProperty]="'testPreset'" [preset]="preset"></div>
   </div>`
})
class SortPropertyTestComponent implements OnInit {
  @ViewChild(SortDirective)
  _sortDirective: SortDirective;

  @ViewChildren(SortPropertyDirective)
  _sortPropertyDirectives: QueryList<SortPropertyDirective>;

  data: Array<Object>;
  preset: Array<Object>;

  ngOnInit() {
    this.data = new Array<Object>();
    this.data.push({ test: 'b', testType: '2015-03-19T14:22:14', testDefault: 2, testPreset: 10 },
      { test: 'a', testType: '2016-07-19T07:12:14', testDefault: 1, testPreset: 20 },
      { test: 'd', testType: '2015-03-17T04:22:14', testDefault: 3, testPreset: 30 });

    this.preset = [10, 30, 20];
  }
}

describe('sortProperty directive', () => {
  let fixture: ComponentFixture<SortPropertyTestComponent>;
  let comp: SortPropertyTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, SortPropertyDirective, SortPropertyTestComponent]
    });

    fixture = TestBed.createComponent(SortPropertyTestComponent);
    comp = fixture.componentInstance;
  });

  it('should have 4 elements with directive', () => {
    fixture.detectChanges();
    expect(comp._sortPropertyDirectives.length).toEqual(4);
  });

  it('property names should match', () => {
    fixture.detectChanges();
    let _temp = comp._sortPropertyDirectives.toArray();

    expect(_temp[0].sortProperty).toEqual('test');
    expect(_temp[1].sortProperty).toEqual('testType');
    expect(_temp[2].sortProperty).toEqual('testDefault');
    expect(_temp[3].sortProperty).toEqual('testPreset');
  });

  it('one property with type="date"', () => {
    fixture.detectChanges();
    let type = comp._sortPropertyDirectives.filter((item, index, array) => {
      return item.type === DATE;
    });

    expect(type.length).toEqual(1);
    expect(type[0].sortProperty).toEqual('testType');
  });

  it('one property with default', () => {
    fixture.detectChanges();
    let _default = comp._sortPropertyDirectives.filter((item, index, array) => {
      return item.default === ASC || item.default === DESC;
    });

    expect(_default.length).toEqual(1);
    expect(_default[0].sortProperty).toEqual('testDefault');
    expect(_default[0].default).toEqual(DESC);
  });

  it('one property with preset', () => {
    fixture.detectChanges();
    let _preset = comp._sortPropertyDirectives.filter((item, index, array) => {
      return item.preset != null;
    });

    expect(_preset.length).toEqual(1);
    expect(_preset[0].sortProperty).toEqual('testPreset');
  });

  it('next order should be set initially', () => {
    fixture.detectChanges();

    let _temp = comp._sortPropertyDirectives.toArray();

    expect(_temp[0].nextOrder).toEqual(ASC);
    expect(_temp[1].nextOrder).toEqual(ASC);
    expect(_temp[2].nextOrder).toEqual(ASC);
    expect(_temp[3].nextOrder).toEqual(ASC);
  });

  it('css class should be set initially', () => {
    fixture.detectChanges();

    let test = fixture.debugElement.query(By.css('div')).children[0].nativeElement as HTMLElement;
    let _default = fixture.debugElement.query(By.css('div')).children[2].nativeElement as HTMLElement;

    expect(test.className).toEqual('');
    expect(_default.className).toEqual(DESCCLASS);
  });

  it('order should be changed after click', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[0];
    let testHtml = fixture.debugElement.query(By.css('div')).children[0].nativeElement;

    click(testHtml);

    expect(testHtml.className).toEqual(ASCCLASS);
    expect(testDir.nextOrder).toEqual(DESC);
  });

  it('order should be changed after click on default', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[2];
    let testHtml = fixture.debugElement.query(By.css('div')).children[2].nativeElement;

    click(testHtml);

    expect(testHtml.className).toEqual(ASCCLASS);
    expect(testDir.nextOrder).toEqual(DESC);
  });

  it('order transition: asc -> desc', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[0];
    let testHtml = fixture.debugElement.query(By.css('div')).children[0].nativeElement;

    click(testHtml);
    click(testHtml);

    expect(testHtml.className).toEqual(DESCCLASS);
    expect(testDir.nextOrder).toEqual(ASC);
  });

  it('should respect preset: asc -> desc', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[3];
    let testHtml = fixture.debugElement.query(By.css('div')).children[3].nativeElement;

    click(testHtml);

    expect(testHtml.className).toEqual(ASCCLASS);
    expect(testDir.nextOrder).toEqual(DESC);

    expect(comp.data[0]['testPreset']).toEqual(10);
    expect(comp.data[0]['test']).toEqual('b');
    expect(comp.data[1]['testPreset']).toEqual(30);
    expect(comp.data[1]['test']).toEqual('d');
    expect(comp.data[2]['testPreset']).toEqual(20);
    expect(comp.data[2]['test']).toEqual('a');
  });

  it('should respect preset: desc -> asc', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[3];
    let testHtml = fixture.debugElement.query(By.css('div')).children[3].nativeElement;

    click(testHtml);
    click(testHtml);

    expect(testHtml.className).toEqual(DESCCLASS);
    expect(testDir.nextOrder).toEqual(ASC);

    expect(comp.data[0]['testPreset']).toEqual(20);
    expect(comp.data[0]['test']).toEqual('a');
    expect(comp.data[1]['testPreset']).toEqual(30);
    expect(comp.data[1]['test']).toEqual('d');
    expect(comp.data[2]['testPreset']).toEqual(10);
    expect(comp.data[2]['test']).toEqual('b');
  });

  it('should respect type: desc -> asc', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[1];
    let testHtml = fixture.debugElement.query(By.css('div')).children[1].nativeElement;

    click(testHtml);

    expect(testHtml.className).toEqual(ASCCLASS);
    expect(testDir.nextOrder).toEqual(DESC);

    expect(comp.data[0]['test']).toEqual('d');
    expect(comp.data[1]['test']).toEqual('b');
    expect(comp.data[2]['test']).toEqual('a');
  });

  it('should respect type: asc -> desc', () => {
    fixture.detectChanges();

    let testDir = comp._sortPropertyDirectives.toArray()[1];
    let testHtml = fixture.debugElement.query(By.css('div')).children[1].nativeElement;

    click(testHtml);
    click(testHtml);

    expect(testHtml.className).toEqual(DESCCLASS);
    expect(testDir.nextOrder).toEqual(ASC);

    expect(comp.data[0]['test']).toEqual('a');
    expect(comp.data[1]['test']).toEqual('b');
    expect(comp.data[2]['test']).toEqual('d');
  });
});
