import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  characterDetail: Result;
  loader = true;

  constructor(
    private characterService: CharacterService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.geCharacterDetails();
  }

  private geCharacterDetails() {
    if (!this.characterService.character) {
      this.route.navigateByUrl('/error');
      return;
    }

    this.characterDetail = this.characterService.character;
    this.loader = false;
  }

  detalsComics(detalsComics: string) {
    console.warn('detalsComics', detalsComics);
  }

  detalsSeries(detalsComics: string) {
    console.warn('detalsComics', detalsComics);
  }
}
