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
  private valueFormSearch: string;

  characters: Result[] = [];
  loader: boolean = true;
  localLoader: boolean = false;
  form: FormGroup;
  charactersResponseComplete: any;

  constructor(
    private characterService: CharacterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getValueSearch();
    this.getCharactersBehavior();
  }

  private setForm() {
    this.form = new FormGroup({
      search: new FormControl()
    });
  }

  private getValueSearch() {
    this.valueFormSearch = this.characterService.valueFormSearch;
    this.form.controls['search'].setValue(this.valueFormSearch)
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

  private getCharactersService() {
    this.characterService.getCharacters(this.counter, this.valueFormSearch)
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

  private setValuesCharacters(value: Data) {
    this.charactersResponseComplete = value;
    this.counter = value.count + value.offset;
    this.characters = value.results;
    console.warn('CHARACTERS', this.characters)
  }

  private startLoarder() {
    this.loader = true;
  }

  private finalizeLoader() {
    this.loader = false
  }

  goToCharacterDetails(character: Result) {
    this.characterService.character = character;
    this.router.navigateByUrl('/character-details');
  }

  moreCharacters() {
    this.localLoader = true;
    this.getCharactersService();
  }

  listCharacters(valueForm: string | undefined) {
    if (!valueForm && !this.valueFormSearch) {
      return;
    }

    this.startLoarder()
    this.counter = 0;
    this.characters = [];
    this.valueFormSearch = valueForm;
    this.characterService.valueFormSearch = this.valueFormSearch;
    this.form.controls['search'].setValue(this.valueFormSearch)
    this.characterService.clearCharactersSubject();
    this.getCharactersService();
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
