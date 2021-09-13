import {
  AxiosResponse,
  AxiosResponseRover,
} from "../../../interfaces/response";
import { INasaData, IRoverData } from "../../../interfaces/nasa-data";
import Axios from "../axios";
import { IOptions } from "../../../interfaces/options";

export const GetRovers = async () => {
  const response: AxiosResponseRover<IRoverData> = await Axios.get(
    "/mars-photos/api/v1/rovers"
  );
  return response;
};

export const GetPictures = async (page: number, options: string) => {
  const option: IOptions = JSON.parse(options);
  const response: AxiosResponse<INasaData> = await Axios.get(
    `/mars-photos/api/v1/rovers/${option.rover}/photos`,
    {
      params: {
        page: page,
        sol: option.sol,
      },
    }
  );
  return response;
};

export const GetPicturesCount = async (rover: string, sol: number) => {
  const response: AxiosResponse<INasaData> = await Axios.get(
    `/mars-photos/api/v1/rovers/${rover}/photos`,
    { params: { sol: sol } }
  );
  return response;
};
