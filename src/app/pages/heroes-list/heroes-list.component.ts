import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  characters: Result[] = [];
  heroImage;
  loader = true;

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.getCharacters();
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
