import { AxiosRequestConfig } from "axios";

export interface AxiosResponse<T> {
  data: {
    photos: Array<T>;
  };
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}
