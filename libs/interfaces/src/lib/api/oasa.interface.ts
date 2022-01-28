export interface LineInfo {
  LineCode: string;
  LineDescr: string;
  LineDescrEng: string;
  LineID: string;
}

export interface RouteInfo {
  LineCode: string;
  RouteCode: string;
  RouteDescr: string;
  RouteDescrEng: string;
  RouteDistance: string;
  RouteType: string;
}

export interface RoutePoint {
  routed_order: string;
  routed_x: string;
  routed_y: string;
}

export interface StopPoint {
  RouteStopOrder: string;
  StopAmea: string;
  StopCode: string;
  StopDescr: string;
  StopDescrEng: string;
  StopHeading: string;
  StopID: string;
  StopLat: string;
  StopLng: string;
  StopStreet: string;
  StopStreetEng: string;
  StopType: string;
}

export interface BusLocation {
  CS_DATE: string;
  CS_LAT: string;
  CS_LNG: string;
  ROUTE_CODE: string;
  VEH_NO: string;
}
