import axios from "axios";

export type MyPosition = {
  real_lng: number;
  real_lat: number;
};
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
  refid: number;
  craetedate: string;
  updatedate: string;

  amen: number;
  amenyn: 1 | 0;
};

export const swrFetcher = async (url: string) => {
  return (await axios.get(url)).data;
};
