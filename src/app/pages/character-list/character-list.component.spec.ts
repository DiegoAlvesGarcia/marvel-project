import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { characterMock } from 'src/app/shared/mocks/characters.mock';
import { CharacterService } from 'src/app/shared/services/character.service';
import { characterStub } from 'src/app/shared/stubs/character.stub';
import { routerStub } from 'src/app/shared/stubs/router.stub';

import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      providers: [
        { provide: CharacterService, useValue: characterStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test the response of service', () => {
    characterStub.characters$ = new BehaviorSubject(null);
    component.ngOnInit()
    expect(characterStub.getCharacters).toHaveBeenCalled();
    expect(component.charactersResponseComplete).toEqual(characterMock);
    expect(component.counter).toEqual(characterMock.count + characterMock.offset);
    expect(component.characters).toEqual(characterMock.results);
  })

  it('should to test the error of service', () => {
    characterStub.characters$ = new BehaviorSubject(null);
    characterStub.getCharacters.mockReturnValue(throwError(''));
    component.ngOnInit();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/error');
  })

  it('should to test the function goToCharacterDetails()', () => {
    component.goToCharacterDetails(characterMock.results[0])
    expect(characterStub.character).toEqual(characterMock.results[0])
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/character-details');
  })

  it('should to test the function moreCharacters()', () => {
    component.moreCharacters();
    expect(component.localLoader).toEqual(true);
    expect(component.charactersResponseComplete).toEqual(characterMock);
    expect(component.counter).toEqual(characterMock.count + characterMock.offset);
    expect(component.characters).toEqual(characterMock.results);
  })

  it('should to test the function listCharacters() with value', () => {
    component.listCharacters('3-D Man');
    expect(component.loader).toEqual(true);
    expect(component.counter).toEqual(0);
    expect(component.characters).toEqual([]);
    expect(component.valueFormSearch).toEqual('3-D Man');
    expect(characterStub.valueFormSearch).toEqual('3-D Man');
    expect(component.form.controls['search'].value).toEqual('3-D Man');
    expect(characterStub.clearCharactersSubject).toHaveBeenCalled();
  })

  it('should to test the function listCharacters() without value', () => {
    characterStub.valueFormSearch = 'wolverine';
    component.ngOnInit();
    component.listCharacters();
    expect(component.valueFormSearch).toEqual('');
    expect(characterStub.valueFormSearch).toEqual('');
    expect(component.form.controls['search'].value).toEqual('');
    expect(characterStub.clearCharactersSubject).toHaveBeenCalled();
  })

  it('should to test the function listCharacters() without value and valueFormSearch without value', () => {
    characterStub.valueFormSearch = '';
    component.ngOnInit();
    component.listCharacters();
  })

  it('should to test the function scrollTop()', () => {
    component.scrollTop()
  })

  afterEach(() => {
    characterStub.characters$ = new BehaviorSubject(characterMock);
  })
});
