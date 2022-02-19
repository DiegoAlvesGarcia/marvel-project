import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { characterInterface, Data } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {

    private publicKey = 'eda97eb5ae79e64b47b53b5b42531fec';
    private privateKey = '750c40ce15ab0236313cf585bfef5a30d520f7a9';
    private time = (Number(new Date()));
    private hash = Md5.hashStr(this.time + this.privateKey + this.publicKey);
    private baseParams = `ts=${this.time}&apikey=${this.publicKey}&hash=${this.hash}`;
    private urlBase = 'https://gateway.marvel.com/v1/public/characters?';

    constructor(
        private httpClient: HttpClient
    ) { }

    getCharacters(): Observable<any> {
        return this.httpClient.get<any>(
            this.urlBase + this.baseParams
        ).pipe(map((response) => response.data));
    }

    geCharacterDetails(name: string): Observable<Data> {
        return this.httpClient.get<characterInterface>(
            this.urlBase + `name=${name}&` + this.baseParams
        ).pipe(
            map((response) => {
                if (response?.data?.results?.length < 1) {
                    throw new Error('character not found');
                }
                return response.data
            }),
        );
    }
}