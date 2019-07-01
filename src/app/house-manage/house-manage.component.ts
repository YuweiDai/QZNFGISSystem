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
  towns: any;
  villages: any;
  map: any;
  boundaryLayer: any;
  labelMarkerLayer: any;
  boundaryStyles: any;

  previousLevel = 6;
  searchBarWidth: number;
  constructor(private mapService: MapService, private layoutService: LayoutService, private geoDataService: GeodataService) {
    this.searchBarWidth = layoutService.getActualScreenSize().width;

    geoDataService.getQZBou().subscribe(q => {
      this.qzBou = q;
      this._zoomEndHandle();
    });
    geoDataService.getCountyBou().subscribe(q => this.counties = q);
    geoDataService.getTownBou().subscribe(q => this.towns = q);
    geoDataService.getVillageBou().subscribe(q => this.villages = q);

    //设置面样式
    this.boundaryStyles = {
      qzStyle: {
        "color": "#15A4FF",
        "weight": 3,
        "opacity": 0.5,
      },
      countyStyle: {
        "color": "#15A4FF",
        "weight": 2,
        "opacity": 0.5,
      },
      townStyle: {
        "color": "#15A4FF",
        "weight": 1,
        "opacity": 0.5,
      },
    };
  }

  ngOnInit() {
    var that = this;
    that.map = that.mapService.createMap('map', [28.905527517199516, 118.50629210472107], that.previousLevel + 1);
    that.mapService.setMyLocation(that.map, [28.9731944495, 118.8546932766]);
    that.boundaryLayer = L.featureGroup().addTo(that.map);
    that.labelMarkerLayer = L.featureGroup().addTo(that.map);

    //绑定地图缩放事件
    // 7 显示市 8-9 显示县 10-12 显示乡镇 
    that.map.on('zoomend', function (e) {
      that._zoomEndHandle();
    });

  }

  _mapLevelClassify(level: number): string {

    if (level == 7) {
      return "市";
    }
    else if (level >= 8 && level <= 10) {
      return "县";
    }
    else if (level >= 11 && level <= 13) {
      return "乡镇";
    }
    else if (level >= 14 && level <= 16) {
      return "行政村";
    }    
    else {
      return "自然村";
    }

  }


  _zoomEndHandle(): void {
    var that = this;
    console.log("123");

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
              return that.boundaryStyles.qzStyle;
            }
          }).addTo(that.boundaryLayer);

          //#endregion          
          break;
        case "县":
          //#region 显示县相关内容
          that.counties.features.forEach(element => {
            var countyCircleIcon = L.divIcon({
              iconSize: [60, 60],
              className: 'circle county',
              html: "<span>" + element.properties.FNAME + "<br/>" + element.properties.count + "户</span>"
            });
            L.marker(element.properties.position, { icon: countyCircleIcon }).addTo(that.labelMarkerLayer);

            //添加境界对象
            L.geoJSON(element, {
              style: function (feature) {
                return that.boundaryStyles.countyStyle;
              }
            }).addTo(that.boundaryLayer);
          });
          //#endregion               
          break;
        case "乡镇":
          //#region 显示乡镇相关内容
          that.towns.features.forEach(element => {

            var popup = L.popup({ closeButton: false, closeOnClick: false, closeOnEscapeKey: false, className: "qznfpopup" })
              .setLatLng(element.properties.position)
              .setContent('<span>' + element.properties.FNAME + '</span><br /><span>' + element.properties.count + '户</span>').addTo(that.labelMarkerLayer)
              .openOn(that.map);

            //添加境界对象
            L.geoJSON(element, {
              style: function (feature) {
                return that.boundaryStyles.countyStyle;
              }
            }).addTo(that.boundaryLayer);
          });
          //#endregion               
          break;
        case "行政村":

          //#region 村
          var gxJSON = { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[118.69368109, 29.047643598], [118.693183314, 29.04238817], [118.69062127, 29.03875739], [118.6923951368, 29.0362060952], [118.693760995, 29.034241626], [118.693669803, 29.029991368], [118.690108101, 29.029894586], [118.6900747595, 29.0295318023], [118.6899781655, 29.0284807785], [118.6898407593, 29.0269856838], [118.689703833, 29.02549581], [118.6893553935, 29.0249036555], [118.6848615104, 29.0172665374], [118.6845424189, 29.0167242582], [118.682650542, 29.013509113], [118.685398197, 29.011577028], [118.686067114, 29.009687024], [118.685221435, 29.008938837], [118.6856017574, 29.008544861], [118.687313026, 29.006772158], [118.68651849, 29.0054218185], [118.686082917, 29.004681548], [118.686054351, 29.003031682], [118.689248579, 28.996957289], [118.688749269, 28.995836804], [118.688710996, 28.990297835], [118.688385071, 28.987514412], [118.6881257632, 28.9869809957], [118.687461163, 28.985613861], [118.6888234574, 28.980610084], [118.6889217354, 28.9802491039], [118.6903685242, 28.9749349743], [118.69047406, 28.974547336], [118.6916034022, 28.9749349743], [118.69659629, 28.976648746], [118.697911374, 28.9749349743], [118.701507942, 28.970248052], [118.7026549762, 28.9697299034], [118.704982357, 28.968678558], [118.705772454, 28.964975585], [118.710941449, 28.966207511], [118.711333707, 28.962897907], [118.709326846, 28.962991515], [118.712948091, 28.961760359], [118.716819531, 28.953935996], [118.721060283, 28.951757879], [118.717860865, 28.949057352], [118.718326786, 28.944181861], [118.729128075, 28.953578249], [118.75327357, 28.951759989], [118.755154856, 28.953459863], [118.75332921, 28.961063595], [118.749846086, 28.965965558], [118.750100358, 28.967147066], [118.749265291, 28.968284207], [118.748409416, 28.96899496], [118.747629476, 28.970364063], [118.7500585, 28.977711491], [118.753770151, 28.977018462], [118.752083443, 28.97946984], [118.751558403, 28.9812025936], [118.751256578, 28.982198686], [118.7522153314, 28.9874015448], [118.751274284, 28.988309736], [118.7520249745, 28.9896382382], [118.752945517, 28.990505668], [118.753101209, 28.991909139], [118.753275039, 28.993998404], [118.7542854625, 28.9946351063], [118.755339776, 28.995529691], [118.748208141, 28.996088632], [118.742552922, 28.998216816], [118.740806235, 28.999248891], [118.738800714, 29.000671772], [118.739170946, 29.00443561], [118.74179775, 29.004492334], [118.745529505, 29.007243088], [118.743717679, 29.010730722], [118.741842959, 29.013108913], [118.739292483, 29.014312965], [118.737521729, 29.017088594], [118.734932484, 29.020838516], [118.7323006449, 29.0210724733], [118.730531516, 29.02122974], [118.726321505, 29.023473887], [118.724877308, 29.025115095], [118.721896911, 29.024644018], [118.716728361, 29.027227441], [118.702796021, 29.024058605], [118.701801644, 29.026574278], [118.70368157, 29.027141625], [118.701689282, 29.03097243], [118.702716169, 29.036966316], [118.701457084, 29.039458071], [118.705063019, 29.046693897], [118.701909852, 29.049763806], [118.696595723, 29.050690571], [118.69368109, 29.047643598]]] }, "properties": { "FNAME": "沟溪乡", "count": 5053, "position": [28.954868806, 118.730215463], "level": 11 } };

          L.geoJSON(gxJSON, {
            style: function (feature) {
              return that.boundaryStyles.countyStyle;
            }
          }).addTo(that.boundaryLayer);

          that.villages.features.forEach(element => {

            var popup = L.popup({ closeButton: false, closeOnClick: false, closeOnEscapeKey: false, className: "qznfpopup" })
              .setLatLng([element.geometry.coordinates[1], element.geometry.coordinates[0]])
              .setContent('<span>' + element.properties.FNAME + '</span><br /><span>' + element.properties.count + '户</span>').addTo(that.labelMarkerLayer)
              .openOn(that.map);
          });
          //#endregion   

          break;
      }


    }
    that.previousLevel = level;
  }
}
