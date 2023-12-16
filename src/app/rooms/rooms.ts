export interface RoomList {
  availableRooms: number;
  bookedRooms: number;
  total: number,
}

export interface Room {
  roomNumber: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
