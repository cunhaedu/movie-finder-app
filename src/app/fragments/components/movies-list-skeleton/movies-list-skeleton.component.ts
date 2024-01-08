import { Component } from '@angular/core';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
} from '@ionic/angular/standalone';

import { MovieCoverComponent } from 'src/app/fragments/components/movie-cover/movie-cover.component';

@Component({
  standalone: true,
  selector: 'app-movies-list-skeleton',
  templateUrl: './movies-list-skeleton.component.html',
  styleUrls: ['./movies-list-skeleton.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonAvatar,
    IonSkeletonText,
    MovieCoverComponent,
  ]
})
export class MoviesListSkeletonComponent {
  dummyArray = new Array(5);
}
