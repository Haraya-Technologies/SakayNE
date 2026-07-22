export type VehicleType = 'jeepney' | 'bus' | 'motorcycle' | 'tricycle';

export type UserRole = 'passenger' | 'driver' | 'admin';

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface Driver {
  _id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  licenseNo: string;
  plateNo: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  isAvailable: boolean;
  rating: number;
  totalTrips: number;
  createdAt?: string;
}

export interface Ride {
  _id?: string;
  passengerId: string;
  driverId?: string;
  origin: string;
  destination: string;
  vehicleType: VehicleType;
  status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
  fare: number;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
