import { BehaviorSubject, of } from "rxjs";
import { characterMock } from "../mocks/characters.mock";

export const characterStub = {
    characters$: new BehaviorSubject(characterMock),
    getCharacters: jest.fn(() => of(characterMock)),
    clearCharactersSubject: jest.fn(),
    valueFormSearch: '',
    character: characterMock.results[0]
}