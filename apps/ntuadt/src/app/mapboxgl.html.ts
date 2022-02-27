export const baseHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>NTUA Digital Twin Iframe</title>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
      rel="stylesheet"
    />
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>
    <script type="text/javascript" src="/assets/js/geojson.min.js"></script>
    <script src="https://unpkg.com/three@0.126.0/build/three.min.js"></script>
    <script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs',
            center: [23.782529708901464, 37.97732290332949],
            zoom: 16,
            pitch: 45,
            bearing: -17.6,
            antialias: true,
        });
    </script>
  </body>
</html>
`;
