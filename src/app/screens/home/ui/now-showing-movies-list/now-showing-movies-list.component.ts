import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';

import { retrieveMovieUrl } from 'src/app/utils/retrieve-movie-url';
import { MovieModel } from 'src/app/models/movie.model';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-now-showing-movies-list',
  templateUrl: './now-showing-movies-list.component.html',
  styleUrls: ['./now-showing-movies-list.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonAvatar,
    RouterModule,
    DatePipe,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ]
})
export class NowShowingMoviesListComponent {
  @Input({ required: true })
  movies: MovieModel[] = [];

  @Input()
  isLoading = false;

  @Output()
  loadMore = new EventEmitter<InfiniteScrollCustomEvent>();

  retrieveMovieImageUrl(movie: MovieModel): string {
    return retrieveMovieUrl(movie.poster_path, 'xs');
  }
}
