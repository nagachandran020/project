import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlertDialogComponent } from './user-alert-dialog.component';

describe('UserAlertDialogComponent', () => {
  let component: UserAlertDialogComponent;
  let fixture: ComponentFixture<UserAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAlertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
