import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Room } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  @Input() rooms: Room[] | null = [];
  @Input() title: string = ''

  @Output() roomSelected = new EventEmitter<Room>

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      this.title = changes['title'].currentValue.toLowerCase();
    }
  }

  ngOnDestroy(): void {
    console.log("View destroyed")
}

  selectRoom(room: Room) {
    this.roomSelected.emit(room);
  }
}
