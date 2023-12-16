import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: '2', disabled: true },
          { validators: [Validators.required] }
        ),
        guestName: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              CustomValidator.ValidateName,
              CustomValidator.ValidateSpecialChar('!'),
            ],
          },
        ],
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        termsAndContidionsAccepted: [
          false,
          { validators: [Validators.requiredTrue] },
        ],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([this.addGuestToCollection()]),
      },
      { updateOn: 'blur', validators: [CustomValidator.ValidateDate] }
    );
    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {})
    // });

    this.bookingForm.valueChanges
      .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
    //   console.log(data)
    // })
    this.bookingForm.reset({
      roomId: '2',
      guestName: '',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      termsAndContidionsAccepted: false,
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestName: 'Mateusz',
      guestEmail: 'test@email.com',
      checkinDate: new Date('28-Nov-2023'),
    });
  }

  addGuest() {
    this.guests.push(this.addGuestToCollection());
  }

  removeGuest(guestIndex: number) {
    this.guests.removeAt(guestIndex);
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  removePassport() {
    this.bookingForm.removeControl('passport');
  }

  private addGuestToCollection(): FormGroup {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }
}
