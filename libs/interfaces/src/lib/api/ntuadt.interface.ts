export interface BusPosition {
  CS_DATE: string;
  CS_LAT: string;
  CS_LNG: string;
  ROUTE_CODE: string;
  VEH_NO: string;
}

export interface Map {
  container: string;
  style: string;
  center: Array<number>;
  zoom: number;
  pitch: number;
  bearing: number;
  antialias: boolean;
}
