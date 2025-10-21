export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isblocked: boolean;
}

export interface GetAllUsersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: User[];
}

export interface GetAllParcelsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any[];
}
interface TrackingEvent {
  status: string;
  note: string;
  location: string;
  timestamp: string;
  _id: string;
}

export interface Parcel {
  _id: string;
  trackingId: string;
  sender: string;
  type: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  trackingEvents: TrackingEvent[];
}

export interface GetParcelsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Parcel[];
}
