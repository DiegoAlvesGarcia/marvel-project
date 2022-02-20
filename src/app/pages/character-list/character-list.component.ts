import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Result[] = [];
  loader = true;
  name: string;

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCharacters();
  }

  private getUserName() {
    this.name = 'Diego'
  }

  private getCharacters() {
    this.characterService.getCharacters().subscribe({
      next: (resp) => {
        console.warn(resp);
        console.warn(resp.results);
        this.characters = resp.results;
      },
      error: () => {

      },
      complete: () => {
        this.loader = false;
      }
    })
  }

}
