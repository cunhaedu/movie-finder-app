import { Component, OnInit, inject } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import {
  IonTitle,
  IonAlert,
  IonHeader,
  IonToolbar,
  IonContent,
  InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';

import { MoviesListSkeletonComponent } from '../../fragments/components/movies-list-skeleton/movies-list-skeleton.component';
import { MoviesListComponent } from '../../fragments/components/movies-list/movies-list.component';
import { TabMenuComponent } from 'src/app/fragments/components/tab-menu/tab-menu.component';
import { MovieGenreModel, MovieModel } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/@core/api/movies/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonAlert,
    TabMenuComponent,
    MoviesListComponent,
    MoviesListSkeletonComponent,
  ],
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService);

  private currentPage  = 1;
  isLoading = true;
  errorMessage: string | null = null;
  movies: MovieModel[] = [];

  genreList: MovieGenreModel[] = [];

  ngOnInit(): void {
    this.loadGenreList();
    this.loadMovies();
  }

  loadGenreList() {
    this.movieService.getGenreList().subscribe({
      next: (data) => {
        this.genreList = data;
      }
    })
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.errorMessage = null;

    if(!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if(event) { event.target.complete(); }
        }),
        catchError((err: { error: { status_message: string } }) => {
          this.errorMessage = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          this.movies.push(...data.results);
          if(event) {
            event.target.disabled = data.page >= data.total_pages;
          }
        }
      })
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
