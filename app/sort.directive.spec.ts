import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SortDirective } from './sort.directive';

@Component({
  template: `<div [sort]="data"></div>`
})
class SortTestComponent implements OnInit {
  @ViewChild(SortDirective)
  _sortDirective: SortDirective;

  data: Array<Object>;

  ngOnInit() {
    this.data = new Array<Object>();
    this.data.push({ test: 'b', other: 2 }, { test: 'a', other: 1 }, { test: 'd', other: 3 });
  }
}

describe('sort directive', () => {
  let fixture: ComponentFixture<SortTestComponent>;
  let comp: SortTestComponent;
  let elements: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, SortTestComponent]
    });

    fixture = TestBed.createComponent(SortTestComponent);
    comp = fixture.componentInstance;
    elements = fixture.debugElement.queryAll(By.directive(SortDirective));
  });

  it('should have one element with directive', () => {
    expect(elements.length).toBe(1);
    expect(comp._sortDirective).not.toBe(null);
  });

  it('should not have a custom sort function', () => {
    expect(comp._sortDirective.refresh.observers.length).toEqual(0);
  });  
});