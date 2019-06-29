import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../services/layout.service';
import { MapService } from '../services/map.service';
import { GeodataService } from '../services/geodata.service';
import L from 'leaflet';

@Component({
  selector: 'app-house-manage',
  templateUrl: './house-manage.component.html',
  styleUrls: ['./house-manage.component.less']
})
export class HouseManageComponent implements OnInit {
  qzBou: any;
  counties: any;
  towns:any;
  map: any;
  boundaryLayer: any;
  labelMarkerLayer: any;
  previousLevel = 7;
  searchBarWidth: number;
  constructor(private mapService: MapService, private layoutService: LayoutService, private geoDataService: GeodataService) {
    this.searchBarWidth = layoutService.getActualScreenSize().width;

    geoDataService.getQZBou().subscribe(q => this.qzBou = q);
    geoDataService.getCountyBou().subscribe(q => this.counties = q);
    geoDataService.getTownBou().subscribe(q => this.towns = q);

  }

  ngOnInit() {
    var that = this;
    that.map = that.mapService.createMap('map', [28.905527517199516, 118.50629210472107], that.previousLevel);
    that.mapService.setMyLocation(that.map, [28.905527517199516, 118.50629210472107]);
    that.boundaryLayer = L.featureGroup().addTo(that.map);
    that.labelMarkerLayer = L.featureGroup().addTo(that.map);


    //绑定地图缩放事件
    // 7 显示市 8-9 显示县 10-12 显示乡镇 
    that.map.on('zoomend', function (e) {
      var level = that.map.getZoom();

      var previousClass = that._mapLevelClassify(that.previousLevel);
      var currentClass = that._mapLevelClassify(level);

      if (previousClass != currentClass) {
        that.boundaryLayer.clearLayers();
        that.labelMarkerLayer.clearLayers();

        switch (currentClass) {
          case "市":
            //#region 显示市相关内容
            var qzCircleIcon = L.divIcon({
              iconSize: [70, 70],
              className: 'circle city',
              html: `<span>衢州市<br/>595553户</span>`
            });
            var qzMarker = L.marker([28.9731569040, 118.8547361920], { icon: qzCircleIcon }).addTo(that.labelMarkerLayer);
            var qzData = that.qzBou;
            //添加境界对象
            var qz = L.geoJSON(qzData, {
              style: function (feature) {
                return { color: feature.properties.color };
              }
            }).bindPopup(function (layer) {
              return layer.feature.properties.FNAME;
            }).addTo(that.boundaryLayer);

            //#endregion          
            break;
          case "县":
            //#region 显示县相关内容
            that.counties.features.forEach(element => {
              var countyCircleIcon = L.divIcon({
                iconSize: [60, 60],
                className: 'circle county',
                html: "<span>" + element.properties.FNAME + "<br/>" + element.properties.count +  "户</span>"
              });
              L.marker(element.properties.position, { icon: countyCircleIcon }).addTo(that.labelMarkerLayer);
            
              //添加境界对象
              L.geoJSON(element, {
                style: function (feature) {
                  return { color: feature.properties.color };
                }
              }).bindPopup(function (layer) {
                return layer.feature.properties.FNAME;
              }).addTo(that.boundaryLayer);
            });
            //#endregion               
            break;
          case "乡镇":
            //#region 显示乡镇相关内容
            console.log("123");
            that.towns.features.forEach(element => {

              var countyCircleIcon = L.divIcon({
                iconSize: [10, 10],
                className: 'circle county',                 
              });
              L.marker(element.properties.position, { icon: countyCircleIcon }).addTo(that.labelMarkerLayer)
              .bindPopup(element.properties.FNAME).openPopup();
            
              //添加境界对象
              L.geoJSON(element, {
                style: function (feature) {
                  return { color: feature.properties.color };
                }
              }).bindPopup(function (layer) {
                return layer.feature.properties.FNAME;
              }).addTo(that.boundaryLayer);
            });
            //#endregion               
            break;
          case "村":
            break;
        }


      }





      that.previousLevel = level;
    });





    // var kcCircleIcon = L.divIcon({
    //   iconSize: [70, 70],
    //   className: 'circle county',
    //   html: `<span>衢州市<br/>595553户</span>`
    // });
    // var qzMarker = L.marker([28.9731569040, 118.8547361920], { icon: qzCircleIcon }).addTo(this.map);



    var layerControl = this.map.layerControl;




  }

  _mapLevelClassify(level: number): string {

    if (level == 7) {
      return "市";
    }
    else if (level >= 8 && level <= 9) {
      return "县";
    }
    else if (level >= 10 && level <= 12) {
      return "乡镇";
    }
    else {
      return "村";
    }

  }
}
