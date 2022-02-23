import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { characterInterface, Data, Result } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {

    private publicKey = 'eda97eb5ae79e64b47b53b5b42531fec';
    private privateKey = '750c40ce15ab0236313cf585bfef5a30d520f7a9';
    private time = (Number(new Date()));
    private hash = Md5.hashStr(this.time + this.privateKey + this.publicKey);
    private baseParams = `ts=${this.time}&apikey=${this.publicKey}&hash=${this.hash}`;
    private urlBase = 'https://gateway.marvel.com/v1/public/characters?';

    private charactersSubject = new BehaviorSubject<Data>(null);

    private characterValue: Result;
    private valueFormSearchListCharacter: string;
    private characterData: Data;
    private characterResultList: Result[] = [];

    constructor(
        private httpClient: HttpClient
    ) { }

    get characters$() {
        return this.charactersSubject.asObservable();
    }

    get character(): Result | undefined {
        return this.characterValue;
    }

    set character(value: Result) {
        this.characterValue = value;
    }

    get valueFormSearch(): string {
        return this.valueFormSearchListCharacter;
    }

    set valueFormSearch(value: string) {
        this.valueFormSearchListCharacter = value;
    }

    getCharacters(counter: number, name?: string): Observable<Data> {
        return this.httpClient.get<characterInterface>(
            this.urlBase + (name ? `nameStartsWith=${name}&` : '') + `offset=${counter}&` + this.baseParams
        ).pipe(
            map((response) => response.data),
    tap((value) => {
        this.characterData = value;
        this.characterResultList = this.characterResultList.concat(value.results);
        this.characterData.results = this.characterResultList;
        this.charactersSubject.next(this.characterData);
    })
        );
    }

clearCharactersSubject() {
    this.characterResultList = [];
    this.charactersSubject.next(null);
}
}