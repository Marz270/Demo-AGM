import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Toggle from 'ol-ext/control/Toggle';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mapas.page.html',
  styleUrl: './mapas.page.css',
})
export class MapasPage implements OnInit {
  map!: Map;

  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [-57.9595, -31.3907],
        zoom: 14,
      }),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource()
    });
    this.map.addLayer(vectorLayer);
  }
}
