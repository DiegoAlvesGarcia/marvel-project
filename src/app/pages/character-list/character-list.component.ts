import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  form: FormGroup;
  valueFormSearch: string;
  charactersResponseComplete: any;

  constructor(
    private characterService: CharacterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCharacters();
    this.setForm();
  }

  setForm() {
    this.form = new FormGroup({
      search: new FormControl()
    });
  }

  private getUserName() {
    this.name = 'Diego'
  }

  getCharacters(name?: string) {
    this.characterService.getCharacters(this.counter, name).subscribe({
      next: (resp) => {
        this.charactersResponseComplete = resp;
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

  moreCharacters() {
    this.localLoader = true;
    this.getCharacters(this.valueFormSearch);
  }

  searchCharacter() {
    this.loader = true;
    this.counter = 0;
    this.characters = [];
    this.valueFormSearch = this.form.value.search
    this.getCharacters(this.valueFormSearch);
  }
}
