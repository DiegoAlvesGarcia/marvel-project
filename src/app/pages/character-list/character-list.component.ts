import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  
  private counter: number = 0;

  characters: Result[] = [];
  loader: boolean = true;
  localLoader: boolean = false;
  name: string;

  constructor(
    private characterService: CharacterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCharacters();
  }

  private getUserName() {
    this.name = 'Diego'
  }

  getCharacters() {
    this.localLoader = true;

    this.characterService.getCharacters(this.counter).subscribe({
      next: (resp) => {
        console.warn(resp);
        console.warn(resp.results);
        this.counter = this.counter + 20;
        this.characters = this.characters.concat(resp.results);
      },
      error: () => {

      },
      complete: () => {
        this.loader = false;
        this.localLoader = false;
      }
    })
  }

  setCharacter(character: Result) {
    this.characterService.character = character;
    this.router.navigateByUrl('/hero-details');
  }
}
