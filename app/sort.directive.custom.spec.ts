import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SortDirective } from './sort.directive';

@Component({
  template: `<div [sort]="data" (refresh)="doSomething($event)"></div>`
})
class SortTestCustomComponent implements OnInit {
  @ViewChild(SortDirective)
  _sortDirective: SortDirective;

  data: Array<Object>;

  ngOnInit() {
    this.data = new Array<Object>();
    this.data.push({ test: 'b', other: 2 }, { test: 'a', other: 1 }, { test: 'd', other: 3 });
  }

  doSomething($event) {

  }
}

describe('sort directive with custom sorting', () => {
  let fixture: ComponentFixture<SortTestCustomComponent>;
  let comp: SortTestCustomComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, SortTestCustomComponent]
    });

    fixture = TestBed.createComponent(SortTestCustomComponent);
    comp = fixture.componentInstance;
  });

  it('should have a custom sort function', () => {
    expect(comp._sortDirective.refresh.observers.length).toBeGreaterThan(0);
  });  
});