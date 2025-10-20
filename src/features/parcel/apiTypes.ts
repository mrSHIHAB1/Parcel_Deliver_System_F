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
export interface Parcel {
  trackingId: string;
  sender: string;
  type: string;
  weight: number;
  fromAddress: string;
  toAddress: string;
  fee: number;
  discountAmount: number;
  status: string;
  status_logs: {
    status: string;
    note: string;
    location: string;
    timestamp: string;
    _id: string;
  }[];
}
export interface GetParcelsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Parcel[];
}
