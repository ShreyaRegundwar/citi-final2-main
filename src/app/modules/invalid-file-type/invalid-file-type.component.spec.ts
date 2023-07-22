import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFileTypeComponent } from './invalid-file-type.component';

describe('InvalidFileTypeComponent', () => {
  let component: InvalidFileTypeComponent;
  let fixture: ComponentFixture<InvalidFileTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidFileTypeComponent]
    });
    fixture = TestBed.createComponent(InvalidFileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
