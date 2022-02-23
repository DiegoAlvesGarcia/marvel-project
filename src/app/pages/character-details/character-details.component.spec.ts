import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/shared/services/character.service';
import { characterStub } from 'src/app/shared/stubs/character.stub';
import { routerStub } from 'src/app/shared/stubs/router.stub';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDetailsComponent ],
      providers: [
        { provide: CharacterService, useValue: characterStub },
        { provide: Router, useValue: routerStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test the function geCharacterDetails() when characterService.character dont have value', () => {
    characterStub.character = undefined;
    component.ngOnInit();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/character-list');
  })
});
