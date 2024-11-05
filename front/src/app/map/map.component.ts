import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import { Style, Icon } from 'ol/style';
import { applyStyle } from 'ol-mapbox-style';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  private async initializeMap(): Promise<void> {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    // Configura la vista centrada en Montevideo
    const view = new View({
      center: fromLonLat([-56.1645, -34.9011]),
      zoom: 10,
    });

    // Crea una capa vectorial vacía que se llenará con el estilo de Mapbox
    const mapboxLayer = new VectorTileLayer();

    // Aplica el estilo de Mapbox a la capa vectorial
    await applyStyle(mapboxLayer, 'https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=pk.eyJ1IjoibWFydGlnZGYiLCJhIjoiY20zNHM1a2FrMDJ6NTJrcHJqczljYXc5aCJ9.mWqbrFybjVe6OyoZBfaYZQ');
    
    // Crea el mapa con las capas OSM y Mapbox
    this.map = new Map({
      target: 'map',
      layers: [tileLayer, mapboxLayer],
      view: view,
    });

    // Agrega un punto en Montevideo
    this.addPointGeometry([-56.1645, -34.9011]);
  }

  private addPointGeometry(coordinates: [number, number]): void {
    // Crea una característica de punto
    const pointFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
    });

    // Estilo para el punto
    pointFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
        }),
      })
    );
    
    // Capa vectorial para mostrar el punto
    const vectorSource = new VectorSource({
      features: [pointFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Añade la capa vectorial al mapa
    this.map.addLayer(vectorLayer);
    
  }
}
