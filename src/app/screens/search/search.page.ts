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

import { MoviesListSkeletonComponent } from 'src/app/fragments/components/movies-list-skeleton/movies-list-skeleton.component';
import { MoviesListComponent } from 'src/app/fragments/components/movies-list/movies-list.component';
import { TabMenuComponent } from 'src/app/fragments/components/tab-menu/tab-menu.component';
import { MovieGenreModel, MovieModel } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/@core/api/movies/movie.service';
import { MovieFiltersComponent } from './ui/movie-filters/movie-filters.component';

interface MovieFilters {
  genres?: number[] | null;
  language?: string | null;
  term?: string | null;
  year?: number | null;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
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
    MovieFiltersComponent,
  ],
})
export class SearchPage implements OnInit {
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

  applyFilters(filters: MovieFilters) {
    // this.currentPage = 1;
    // this.movies = [];
    // this.loadMovies();
  }
}
