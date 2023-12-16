import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  id: number = 0;

  id$ = this.router.paramMap.pipe(
    map((params) => params.get('id'))
  );

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
    // this.router.paramMap.subscribe((params) => {params.get('id')})
  }
}
