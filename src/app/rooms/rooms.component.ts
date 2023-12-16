import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomList, Room } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {
  hotelName = 'Miami';
  hideRooms = true;
  roomNumber = 2137;
  roomList: Room[] = [];

  error$: Subject<string> = new Subject();
  getError$ = this.error$.asObservable();

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.complete();
    observer.error('Custom error');
  });

  rooms: RoomList = {
    total: 15,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Hotel Room list';
  selectedRoom!: Room;
  totalBytes = 0;

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomCount$ = this.roomService.getRooms$.pipe(map((rooms) => rooms.length));

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerComponents!: QueryList<HeaderComponent>;

  constructor(
    @SkipSelf() private roomService: RoomsService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been send');
          break;
        }

        case HttpEventType.ResponseHeader: {
          console.log('Request successfull');
          break;
        }

        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }

        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (err) => console.log(err),
    });
    this.roomService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });
  }

  ngDoCheck(): void {
    console.log('ngOn Changes');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = this.hotelName + ' view';
    this.headerComponents.forEach(
      (item) => (item.title = this.hotelName + ' view')
    );
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'ROOMS';
  }

  selectRoom(room: Room) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: Room = {
      roomType: 'EXTRA big',
      roomNumber: '34',
      amenities: 'Bathroom',
      price: 32,
      photos:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date(),
      rating: 5,
    };

    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  updateRoom() {
    const room: Room = {
      roomType: 'EXTRA big',
      roomNumber: '2',
      amenities: 'Bathroom',
      price: 32,
      photos:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date(),
      rating: 5,
    };

    this.roomService.updateRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom('1').subscribe((data) => {
      this.roomList = data;
    });
  }
}
