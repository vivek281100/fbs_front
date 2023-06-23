export class Payment {
  payment_Mode: string = '';

  total_Price!: number;

  paymentStatus!: boolean;

  bookingid!: number;
  payment_DateTime!: Date;
}
