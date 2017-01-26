import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ButtonClickEvents, click } from './index';

import { ASC, ASCCLASS, DATE, DESC, DESCCLASS } from './constants';
import { SortDirective } from './sort.directive';
import { SortPropertyDirective } from './sortProperty.directive';

@Component({
  template:
  `<div [sort]="data" (refresh)="doSomething($event)">
     <div [sortProperty]="'test'"></div>
     <div [sortProperty]="'testType'" [type]="'date'"></div>
     <div [sortProperty]="'testDefault'" [default]="'desc'"></div>
     <div [sortProperty]="'testPreset'" [preset]="preset"></div>
   </div>`
})
class SortPropertyCustomTestComponent implements OnInit {
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

  doSomething($event) {
    $event.afterCustomSort();
  }
}

describe('sortProperty directive with custom sorting', () => {
  let fixture: ComponentFixture<SortPropertyCustomTestComponent>;
  let comp: SortPropertyCustomTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, SortPropertyDirective, SortPropertyCustomTestComponent]
    });

    fixture = TestBed.createComponent(SortPropertyCustomTestComponent);
    comp = fixture.componentInstance;
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

    expect(test.className).toEqual('');    
  });
  
  it('css class should not be set initially on default when custom sort function is active', () => {
    fixture.detectChanges();
    
    let _default = fixture.debugElement.query(By.css('div')).children[2].nativeElement as HTMLElement;

    expect(_default.className).toEqual('');    
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
  });

  it('should respect preset: desc -> asc', () => { 
    fixture.detectChanges();
    
    let testDir = comp._sortPropertyDirectives.toArray()[3];
    let testHtml = fixture.debugElement.query(By.css('div')).children[3].nativeElement;

    click(testHtml);
    click(testHtml);
      
    expect(testHtml.className).toEqual(DESCCLASS);
    expect(testDir.nextOrder).toEqual(ASC);
  });
  
  it('should respect type: desc -> asc', () => { 
    fixture.detectChanges();
    
    let testDir = comp._sortPropertyDirectives.toArray()[1];
    let testHtml = fixture.debugElement.query(By.css('div')).children[1].nativeElement;

    click(testHtml);
      
    expect(testHtml.className).toEqual(ASCCLASS);
    expect(testDir.nextOrder).toEqual(DESC);
  });

  it('should respect type: asc -> desc', () => { 
    fixture.detectChanges();
    
    let testDir = comp._sortPropertyDirectives.toArray()[1];
    let testHtml = fixture.debugElement.query(By.css('div')).children[1].nativeElement;

    click(testHtml);
    click(testHtml);
      
    expect(testHtml.className).toEqual(DESCCLASS);
    expect(testDir.nextOrder).toEqual(ASC);
  });  
});