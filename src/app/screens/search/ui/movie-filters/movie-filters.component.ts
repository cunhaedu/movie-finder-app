import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { IonSearchbar, IonToolbar } from '@ionic/angular/standalone';

interface MovieFilters {
  genres?: number[] | null;
  language?: string | null;
  term?: string | null;
  year?: number | null;
}

@Component({
  standalone: true,
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonSearchbar,
    IonToolbar,
  ]
})
export class MovieFiltersComponent {
  @Output()
  search = new EventEmitter<MovieFilters>();

  form = new FormGroup({
    language: new FormControl<string>(''),
    term: new FormControl<string>(''),
    year: new FormControl<number>(0),
    genres: new FormControl<number[]>([]),
  });

  handleSubmit() {
    this.search.emit(this.form.value);
  }

  onSearchChange(term: string | null | undefined) {
    this.form.get('term')?.setValue(term as string);
  }
}
