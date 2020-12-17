import { User } from './User';

export class Pharmacy {
    id: number;
    name: string;
    address: string;
    telephone: string;
    pharmacyType: string
    email: string;
    location:string;
    isActive:boolean;
    users : User[]
  }