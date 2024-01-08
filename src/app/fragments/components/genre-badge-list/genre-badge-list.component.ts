import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-genre-badge-list',
  templateUrl: './genre-badge-list.component.html',
  styleUrls: ['./genre-badge-list.component.scss'],
  imports: [NgFor]
})
export class GenreBadgeListComponent {
  @Input()
  genres: string[] = [];

  retrieveGenres() {
    if(this.genres.length > 3) {
      return this.genres
        .slice(0, 3)
        .concat(`+ ${this.genres.length - 3}`);
    }

    return this.genres;
  }
}
