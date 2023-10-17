import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentPointComponent } from './update-student-point.component';

describe('UpdateStudentPointComponent', () => {
  let component: UpdateStudentPointComponent;
  let fixture: ComponentFixture<UpdateStudentPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudentPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
