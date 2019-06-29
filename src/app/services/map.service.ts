import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  locationMarker: any;

  constructor() { }

  createMap(htmlId: string, centerPoint: Array<number>, zoom: number): any {
    var normal = this.getLayer("vector");
    var satellite = this.getLayer("img");

    var map = L.map(htmlId, {
      crs: L.CRS.EPSG4326,
      center: centerPoint,
      zoom: zoom,
      layers: [satellite, normal]
    });

    // normal.addTo(map);

    var zoomControl = map.zoomControl;
    zoomControl.setPosition("bottomleft");

    var attributeControl = map.attributionControl;
    attributeControl.setPrefix("<a href='http://www.qz-map.com'>地图数据来源：天地图衢州</a>");

    //添加定位控件

    var baseMaps = {
      "卫星": satellite,
      "地图": normal
    };
    var overlayMaps = {
    };

    L.control.layers(baseMaps, overlayMaps).setPosition("topright").addTo(map);
 
    return map;
  }

  //获取指定类型的地图
  getLayer(layerType: string): any {
    var layerGroup = null;

    if (layerType == "img") {
      // 省级
      var province = L.tileLayer("http://srv{s}.zjditu.cn/ZJDOM_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=imgmap&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 17,
        zoomOffset: 1
      });
      var provinceAnno = L.tileLayer("http://srv{s}.zjditu.cn/ZJDOMANNO_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJIMGANNO&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 17,
        zoomOffset: 1
      });
      layerGroup = L.layerGroup([province, provinceAnno]);
    }
    else {
      // 省级
      var province = L.tileLayer("http://srv{s}.zjditu.cn/ZJEMAP_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJEMAP&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 17,
        zoomOffset: 1
      });
      var provinceAnno = L.tileLayer("http://srv{s}.zjditu.cn/ZJEMAPANNO_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJEMAPANNO&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 17,
        zoomOffset: 1
      });
      layerGroup = L.layerGroup([province, provinceAnno]);
    }
    return layerGroup;
  }

  setMyLocation(map: any, postion: Array<number>): any {
    if (this.locationMarker == null) {
      var locationIcon = L.divIcon({
        
        className: 'mapboxgl-user-location-dot mapboxgl-marker mapboxgl-marker-anchor-center',
        html: `<span style="transform:'translate(-50%, -50%) translate(960px, 469px)'" />`
      });
      this.locationMarker = L.marker(postion, { icon: locationIcon }).addTo(map);

      this.addLocationControl(map);
    }
    else {
      this.locationMarker.setLatLng(postion);
    }
  }

  addLocationControl(map: any): any {
    var that=this;
    L.Control.Location = L.Control.extend({
      options: {
        position: 'topright' //初始位置
      },
      initialize: function (options) {
        L.Util.extend(this.options, options);

      },
      onAdd (map:any) {
        //创建一个class为location的div
        this._container = L.DomUtil.create('div', 'leaflet-control-location leaflet-control');
        this._container.innerHTML = "<a><i class='iconfont icon-Location'></i></a>";
        this._container.addEventListener('click', function () {
          var position = that.locationMarker.getLatLng();
          map.flyTo(position, 17);
        });

        return this._container;
      },

      onRemove (map:any) {
        // Nothing to do here
      }
    });
    L.control.location = function (opts) {
      return new L.Control.Location(opts);
    }

    var locationControl = L.control.location({ position: 'bottomleft' });
    //添加图例
    locationControl.addTo(map);
  }
}

