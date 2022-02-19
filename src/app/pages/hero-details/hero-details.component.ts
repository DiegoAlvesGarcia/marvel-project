import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  caracterDetail: Result;
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
        this.caracterDetail = resp.results[0];
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
