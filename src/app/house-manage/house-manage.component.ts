import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MapService } from '../services/map.service';
import L from 'leaflet';

@Component({
  selector: 'app-house-manage',
  templateUrl: './house-manage.component.html',
  styleUrls: ['./house-manage.component.less']
})
export class HouseManageComponent implements OnInit {
  map: any;
  searchBarWidth: number;
  constructor(private mapService: MapService, private layoutService: LayoutService) {
    this.searchBarWidth = layoutService.getActualScreenSize().width;

  }

  ngOnInit() {
    this.map = this.mapService.createMap('map', [28.905527517199516, 118.50629210472107], 7);

    this.mapService.setMyLocation(this.map,[28.905527517199516, 118.50629210472107]);
  }
}
