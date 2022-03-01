import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Tv } from '../../_cores/models/tv';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.scss'],
})
export class TvsComponent implements OnInit {
  searchValue: string | null = null;
  tvs: Tv[] = [];
  genreId: string | null = null;
  constructor(private route: ActivatedRoute, private tvsService: TvsService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvsByGenres(genreId, 1);
      } else {
        this.getPagedTvs(1);
      }
    });
  }

  getPagedTvs(page: number, searchKeys?: string) {
    this.tvsService
      .searchTvs(page, searchKeys)
      .pipe(first())
      .subscribe((tvs) => (this.tvs = tvs));
  }

  paginate(event: any) {
    let pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvsByGenres(this.genreId, pageNumber);
    } else if (this.searchValue) {
      this.getPagedTvs(pageNumber, this.searchValue);
    } else {
      this.getPagedTvs(pageNumber);
    }
  }

  getTvsByGenres(genreId: string, page: number) {
    this.tvsService
      .getTvsByGenres(genreId, page)
      .pipe(first())
      .subscribe((tvs) => {
        this.tvs = tvs;
      });
  }

  searchChanged() {
    if (this.searchValue) this.getPagedTvs(1, this.searchValue);
  }
}
