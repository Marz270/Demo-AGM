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
import { Style, Icon } from 'ol/style';

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

  private initializeMap(): void {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    // Configura la vista centrada en Londres
    const view = new View({
      center: fromLonLat([-0.1276, 51.5074]),
      zoom: 10,
    });

    // Crea el mapa
    this.map = new Map({
      target: 'map',
      layers: [tileLayer],
      view: view,
    });

    // Agrega un punto en Londres
    this.addPointGeometry([-0.1276, 51.5074]);
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
