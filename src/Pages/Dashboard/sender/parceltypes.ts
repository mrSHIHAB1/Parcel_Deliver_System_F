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
