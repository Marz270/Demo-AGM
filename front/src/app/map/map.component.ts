import { Component, OnInit } from '@angular/core';
import {View, Map, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import {Modify, Draw} from 'ol/interaction';
import { Punto } from '../interfaces/punto';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Map;
  draw!: Draw;
  modify!: Modify;
  vectorSource: VectorSource;
  drawType: 'Point' | 'LineString' | 'Polygon' | 'Circle' = 'Point'; 
  isDrawMode: boolean = true; 

  puntos: Punto[] = [
    { latitud: -56.1645, longitud: -34.9011 },
    { latitud: -56.1687, longitud: -34.892 },
    { latitud: -56.1601, longitud: -34.8897 },
    { latitud: -56.1663, longitud: -34.915 },
    { latitud: -56.1618, longitud: -34.9213 },
    { latitud: -56.1582, longitud: -34.8842 },
  ];

  constructor() {
    this.vectorSource = new VectorSource();
  }

  ngOnInit(): void {
    this.initializeMap();
    this.addInteractions();
  }

  private initializeMap(): void {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const view = new View({
      center: fromLonLat([-56.1645, -34.9011]),
      zoom: 13,
    });

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.map = new Map({
      target: 'map',
      layers: [tileLayer, vectorLayer],
      view: view,
    });

    for (let punto of this.puntos) {
      this.addPointGeometry([punto.latitud, punto.longitud]);
    }
  }

  // Agrega un punto/s al mapa
  private addPointGeometry(coordinates: [number, number]): void {
    const pointFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
    });

    pointFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
        }),
      })
    );

    this.vectorSource.addFeature(pointFeature);
  }

  private addInteractions(): void {
    // Inicializa la modificación
    this.modify = new Modify({ source: this.vectorSource });
    this.map.addInteraction(this.modify);
    this.modify.setActive(false);

    // Inicializa el dibujo
    this.updateDrawInteraction();
  }

  private updateDrawInteraction(): void {
    if (this.draw) {
      this.map.removeInteraction(this.draw);
    }

    // Crea una nueva interacción de dibujo
    this.draw = new Draw({
      source: this.vectorSource,
      type: this.drawType,
    });

    // Añade la interacción al mapa
    this.map.addInteraction(this.draw);
    // Activa o desactiva la interacción de dibujo
    this.draw.setActive(this.isDrawMode); 
  }

  // cuando se cambia el tipo de dibujo
  onDrawTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value as 'Point' | 'LineString' | 'Polygon' | 'Circle';
    this.drawType = selectedType;
    this.updateDrawInteraction(); 
  }

  toggleMode(): void {
    this.isDrawMode = !this.isDrawMode;
    this.draw.setActive(this.isDrawMode);
    this.modify.setActive(!this.isDrawMode);
  }

  // Resetea el mapa 
  resetMap(): void {
    this.vectorSource.clear(); 
  }
}
