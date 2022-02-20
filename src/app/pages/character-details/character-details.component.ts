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
    this.characterService.geCharacterDetails('wolverine').subscribe({
      next: (resp) => {
        console.warn(resp.results[0])
        this.characterDetail = resp.results[0];
      },
      error: () => {
        this.route.navigateByUrl('/error');
      },
      complete: () => {
        this.loader = false
      }
    })
  }

  detalsComics(detalsComics: string) {
    console.warn('detalsComics', detalsComics);
  }

  detalsSeries(detalsComics: string) {
    console.warn('detalsComics', detalsComics);
  }
}
