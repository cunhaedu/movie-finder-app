import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  IonBackButton,
  IonContent,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonLabel,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';

import { retrieveMovieUrl } from 'src/app/utils/retrieve-movie-url';
import { MovieService } from 'src/app/@core/api/movies/movie.service';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    IonBackButton,
    IonContent,
    IonToolbar,
    IonButtons,
    IonHeader,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonLabel,
    IonItem,
    IonIcon,
  ]
})
export class DetailsPage {
  private movieService = inject(MovieService);

  movie: WritableSignal<MovieModel | null> = signal(null);

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }

  @Input() set id(movieId: number) {
    console.log(movieId);

    this.movieService.getMovieDetails(movieId).subscribe(movie => {
      console.log(movie);
      this.movie.set(movie);
    });
  }

  retrieveMovieImageUrl(movie: MovieModel): string {
    return retrieveMovieUrl(movie.poster_path, 'md');
  }

  retrieveMovieGenresAsList(movie: MovieModel): string {
    return movie.genres.map(g => g.name).join(', ');
  }
}
