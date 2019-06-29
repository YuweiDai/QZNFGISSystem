import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  createMap(htmlId: string, centerPoint: Array<number>, zoom: number): any {
    var normal = this.getLayer("vector");
    var satellite = this.getLayer("img");

    var map = L.map(htmlId, {
      crs: L.CRS.EPSG4326,
      center: centerPoint,
      zoom: zoom
    });

    var zoomControl = map.zoomControl;
    zoomControl.setPosition("bottomleft");

    var attributeControl = map.attributionControl;
    attributeControl.setPrefix("<a href='http://www.qz-map.com'>地图数据来源：天地图衢州</a>");

    //添加定位控件


    normal.addTo(map);
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
        maxZoom: 19,
        zoomOffset: 1
      });
      var provinceAnno = L.tileLayer("http://srv{s}.zjditu.cn/ZJDOMANNO_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJIMGANNO&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 19,
        zoomOffset: 1
      });
      layerGroup = L.layerGroup([province, provinceAnno]);
    }
    else {
      // 省级
      var province = L.tileLayer("http://srv{s}.zjditu.cn/ZJEMAP_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJEMAP&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 19,
        zoomOffset: 1
      });
      var provinceAnno = L.tileLayer("http://srv{s}.zjditu.cn/ZJEMAPANNO_2D/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=TDT_ZJEMAPANNO&tileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=image/jpgpng", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 7,
        maxZoom: 19,
        zoomOffset: 1
      });
      layerGroup = L.layerGroup([province, provinceAnno]);
    }
    return layerGroup;
  }
}
