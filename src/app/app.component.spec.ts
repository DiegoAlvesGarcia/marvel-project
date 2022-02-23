import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routerStub } from './shared/stubs/router.stub';
import { Location } from '@angular/common';
import { locationStub } from './shared/stubs/location.stub';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })
  
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should to test the function previousRoute', () => {
    app.previousRoute()
    expect(locationStub.back).toHaveBeenCalled();
  })

  it('should to test the function nextRoute', () => {
    app.nextRoute()
    expect(locationStub.forward).toHaveBeenCalled();
  })
});
