import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { SessaoService } from 'src/app/service/sessao/sessao.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/env/desenv';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  map!: mapboxgl.Map;

  @Input() x: any;
  @Input() y: any;
  @Input() sessao!: boolean;

  constructor(private sessaoService: SessaoService) {
  }

  ngAfterViewInit(): void {
    debugger;
    const e = this.sessaoService.getSessao() as any;

    this.montarMapa(this.x, this.y)

    if(this.x && this.y)
      this.addMarker(this.x, this.y, 'Localização', this.map);
  }

  public montarMapa(x: number, y: number) {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapApi,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 14,
      attributionControl: false,
      center: [y,x]
    });
  }

  private addMarker(lat: number, lng: number, message: string, map: mapboxgl.Map) {
    new mapboxgl.Marker().setLngLat(new mapboxgl.LngLat(lng, lat))
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setText(message))
      .addTo(this.map);
  }
}
