import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, take } from 'rxjs';
import { characterCompleteMock } from '../mocks/characters-complete.mock';
import { characterMock } from '../mocks/characters.mock';
import { httpClient } from '../stubs/http-cliente.stub';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
    let service: CharacterService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: httpClient },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        service = TestBed.get(CharacterService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should to test the function characters$', () => {
        service.characters$.pipe(take(1)).subscribe((resp) => {
            expect(resp).toEqual(characterMock)
        })
    });

    it('should to test the functions get and set of characters', () => {
        service.character = characterMock.results[0];
        let get = service.character
        expect(get).toEqual(characterMock.results[0])
    })

    it('should to test the functions get and set of valueFormSearch', () => {
        service.valueFormSearch = 'wolverine'
        let get = service.valueFormSearch;
        expect(get).toEqual('wolverine');
    })

    it('should to test the function clearCharactersSubject()', () => {
        service.clearCharactersSubject();
        service.characters$.pipe(take(1)).subscribe((resp) => {
            expect(resp).toBeNull()
        })
    })

    it('should to test the function getCharacters()', () => {
        httpClient.get.mockReturnValue(of(characterCompleteMock))
        service.getCharacters(0, 'wolverine').subscribe();
        service.characters$.pipe(take(1)).subscribe((resp) => {
            expect(resp).toEqual(characterMock)
        })
    })
});
