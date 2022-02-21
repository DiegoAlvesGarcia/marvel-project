import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, AfterViewInit {
  characterDetail: Result;
  loader = true;

  constructor(
    private characterService: CharacterService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.geCharacterDetails();
  }

  ngAfterViewInit(): void {
    this.setBackgroundImage();
  }

  private geCharacterDetails() {
    if (!this.characterService.character) {
      this.route.navigateByUrl('/character-list');
      return;
    }

    this.characterDetail = this.characterService.character;
    this.loader = false;
  }

  private setBackgroundImage() {
    if (document.getElementById('imagemBackground')) {
      document.getElementById('imagemBackground').style.backgroundImage =
        `url(${this.characterDetail.thumbnail.path + '.' + this.characterDetail.thumbnail.extension})`;
    }
  }
}
