import { AxiosResponse } from "../../../interfaces/response";
import { INasaData } from "../../../interfaces/nasa-data";
import Axios from "../axios";

export const GetPictures = async (page: number) => {
  const response: AxiosResponse<INasaData> = await Axios.get(
    "/mars-photos/api/v1/rovers/curiosity/photos",
    {
      params: {
        page: page,
        sol: 1000,
      },
    }
  );
  return response;
};

export const GetPicturesCount = async () => {
  const response: AxiosResponse<INasaData> = await Axios.get(
    "/mars-photos/api/v1/rovers/curiosity/photos",
    { params: { sol: 1000 } }
  );
  return response;
};
