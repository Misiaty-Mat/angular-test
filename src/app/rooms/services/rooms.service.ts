import { Inject, Injectable } from '@angular/core';
import { Room } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../ApiConfig/appconfig.service';
import { AppConfig } from '../../ApiConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  // headers = new HttpHeaders({'token': '12345gggffd'});
  getRooms$ = this.http.get<Room[]>('/api/rooms').pipe(
    shareReplay(1)
  );

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
    console.log('Initialized service');
  }

  getRooms() {
    return this.http.get<Room[]>('/api/rooms');
  }

  addRoom(room: Room) {
    return this.http.post<Room[]>('/api/rooms', room);
  }

  updateRoom(room: Room) {
    return this.http.put<Room[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<Room[]>(`api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      { reportProgress: true }
      );
    return this.http.request(request);
  }
}
