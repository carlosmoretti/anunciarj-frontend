import { Component, OnInit, Input } from '@angular/core';
import { SessaoService } from 'src/app/service/sessao/sessao.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/env/desenv';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map!: mapboxgl.Map;

  @Input() x: any;
  @Input() y: any;
  @Input() sessao!: boolean;

  constructor(private sessaoService: SessaoService) {
  }

  ngOnInit(): void {
   this.sessaoService.getLocalizacao()
    .subscribe((e: any) => {
      this.map = new mapboxgl.Map({
        accessToken: environment.mapApi,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 14,
        attributionControl: false,
        center: this.sessao ? [e.y, e.x] : [this.y, this.x]
      });

      new mapboxgl.Marker().setLngLat(new mapboxgl.LngLat(e.y, e.x)).addTo(this.map);
      this.addMarker(e.x, e.y, 'Você', this.map);
      
      if(this.x && this.y)
        this.addMarker(this.x, this.y, 'Anunciante', this.map);
    })
  }

  private addMarker(lat: number, lng: number, message: string, map: mapboxgl.Map) {
    new mapboxgl.Marker().setLngLat(new mapboxgl.LngLat(lng, lat))
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setText(message))
      .addTo(this.map);
  }
}
