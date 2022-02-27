mapboxgl.accessToken =
  'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs',
  center: [23.782529708901464, 37.97732290332949],
  zoom: 16,
  pitch: 45,
  bearing: -17.6,
  antialias: true,
});
