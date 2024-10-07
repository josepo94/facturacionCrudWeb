import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactruraComponent } from './factrura.component';

describe('FactruraComponent', () => {
  let component: FactruraComponent;
  let fixture: ComponentFixture<FactruraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactruraComponent]
    });
    fixture = TestBed.createComponent(FactruraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
