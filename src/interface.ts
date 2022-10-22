import axios from "axios";

export type SimplePrayType = {
  lat: number;
  lng: number;
  count: number;
};

export type PrayType = {
  id: string;
  lat: number;
  lng: number;
  real_lat: number;
  real_lng: number;
  content: string;
  refId: number;
  craetedate: string;
  updatedate: string;
};

export const swrFetcher = async (url: string) => {
  return (await axios.get(url)).data;
};
