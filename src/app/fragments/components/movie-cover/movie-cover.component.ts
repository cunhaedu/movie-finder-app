import { IonSkeletonText } from '@ionic/angular/standalone';
import { Component, Input } from '@angular/core';

import { retrieveMovieUrl } from 'src/app/utils/retrieve-movie-url';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  standalone: true,
  selector: 'app-movie-cover',
  templateUrl: './movie-cover.component.html',
  styleUrls: ['./movie-cover.component.scss'],
  imports: [IonSkeletonText],
})
export class MovieCoverComponent {
  @Input({ required: true })
  size: 'md' | 'lg' = 'md';

  @Input()
  movie!: MovieModel;

  @Input()
  isSkeleton = false;

  retrieveMovieImageUrl(): string {
    return retrieveMovieUrl(this.movie.poster_path, this.size);
  }
}
