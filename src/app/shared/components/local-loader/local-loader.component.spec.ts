import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalLoaderComponent } from './local-loader.component';

describe('LocalLoaderComponent', () => {
  let component: LocalLoaderComponent;
  let fixture: ComponentFixture<LocalLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
