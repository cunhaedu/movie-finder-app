import { Component, EventEmitter, Input, Output } from '@angular/core';
import { star, timeOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';

import { GenreBadgeListComponent } from 'src/app/fragments/components/genre-badge-list/genre-badge-list.component';
import { MovieCoverComponent } from 'src/app/fragments/components/movie-cover/movie-cover.component';
import { MovieGenreModel, MovieModel } from 'src/app/models/movie.model';

@Component({
  standalone: true,
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  imports: [
    IonList,
    IonIcon,
    IonTitle,
    IonItem,
    IonLabel,
    RouterModule,
    IonInfiniteScroll,
    MovieCoverComponent,
    GenreBadgeListComponent,
    IonInfiniteScrollContent,
  ]
})
export class MoviesListComponent {
  @Input({ required: true })
  movies: MovieModel[] = [];

  @Input()
  genreList: MovieGenreModel[] = [];

  @Input()
  isLoading = false;

  @Input()
  hasPagination = true;

  @Output()
  loadMore = new EventEmitter<InfiniteScrollCustomEvent>();

  constructor() {
    addIcons({ star, timeOutline });
  }

  retrieveMovieGenresList(movie: MovieModel): string[] {
    return this.genreList
      .filter((genre) => movie.genre_ids.includes(genre.id))
      .map(genre => genre.name);
  }
}
