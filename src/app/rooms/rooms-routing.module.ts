import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomsComponent } from './rooms.component';
import { roomGuard } from './guards/room.guard';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    canActivateChild: [roomGuard],
    children: [
    {path: 'add', component: RoomAddComponent},
    {path: ':id', component: BookingComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
