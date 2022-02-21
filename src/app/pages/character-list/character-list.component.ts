import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Data, Result } from 'src/app/shared/interfaces/character.interface';
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
    this.setForm();
    this.getUserName();
    this.getCharactersBehavior();
  }

  private setForm() {
    this.form = new FormGroup({
      search: new FormControl()
    });
  }

  private getUserName() {
    this.name = 'Diego'
  }

  private getCharactersService(name?: string) {
    this.characterService.getCharacters(this.counter, name)
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.setValuesCharacters(resp);
        },
        error: () => {
          this.router.navigateByUrl('/error')
        },
        complete: () => {
          this.finalizeLoader();
          this.localLoader = false;
        }
      })
  }

  private getCharactersBehavior() {
    this.characterService.characters$
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          if (!resp) {
            this.getCharactersService()
            return
          }

          this.setValuesCharacters(resp);
          this.finalizeLoader();
        },
      })
  }

  private setValuesCharacters(value: Data) {
    this.charactersResponseComplete = value;
    this.counter = value.count + value.offset;
    this.characters = value.results;
  }

  setCharacter(character: Result) {
    this.characterService.character = character;
    this.router.navigateByUrl('/character-details');
  }

  moreCharacters() {
    this.localLoader = true;
    this.getCharactersService(this.valueFormSearch);
  }

  searchCharacter() {
    this.startLoarder()
    this.counter = 0;
    this.characters = [];
    this.valueFormSearch = this.form.value.search
    this.characterService.clearCharactersSubject();
    this.getCharactersService(this.valueFormSearch);
  }
  
  private startLoarder() {
    this.loader = true;
  }

  private finalizeLoader() {
      this.loader = false
  }
}
