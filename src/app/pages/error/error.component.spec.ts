import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { routerStub } from 'src/app/shared/stubs/router.stub';

import { ErrorComponent } from './error.component';

describe('ErrorComponents', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test the function tryAgain()', () => {
    component.tryAgain();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/character-list');
  })
});
