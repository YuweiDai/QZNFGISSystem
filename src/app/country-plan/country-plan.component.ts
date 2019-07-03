import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { GeodataService } from '../services/geodata.service';
import L from 'leaflet';
import { LayoutService } from '../services/layout.service';
const data = [
  {
    url: '../../assets/content/3.jpg'
  },
  {
    url: '../../assets/content/4.jpg'
  },
  {
    url: '../../assets/content/5.jpg'
  }
];

@Component({
  selector: 'app-country-plan',
  templateUrl: './country-plan.component.html',
  styleUrls: ['./country-plan.component.less']
})
export class CountryPlanComponent implements OnInit {
map:any;
hamlets:any;
boundaryLayer: any;
labelMarkerLayer: any;
boundaryStyles: any;
mz:any;
m1:any;
m2:any;
m3:any;
showCard=false;
mapheight="100%";
hcount="";
people="";
type="";
cardTitle="";
files = data.slice(0);
searchBarWidth: number;

  constructor(private mapService: MapService,private geoDataService: GeodataService, private layoutService: LayoutService) { 
    this.searchBarWidth = layoutService.getActualScreenSize().width;
    geoDataService.getHamletBou().subscribe(q => this.hamlets = q);
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
    that.map = that.mapService.createMap('map', [28.980403058230877,118.72820734977722], 14);
    that.boundaryLayer = L.featureGroup().addTo(that.map);
    that.labelMarkerLayer = L.featureGroup().addTo(that.map);

    that.mz = L.icon({
      iconUrl: '../../assets/images/mz.png',
      iconAnchor: [12, 12],
  });
   that.m1 = L.icon({
    iconUrl: '../../assets/images/m1.png',
    iconAnchor: [12, 12],
  });
  that.m2 = L.icon({
  iconUrl: '../../assets/images/m2.png',
  iconAnchor: [12, 12],
  });
  that.m3 = L.icon({
  iconUrl: '../../assets/images/m3.png',
  iconAnchor: [12, 12],
  });

    setTimeout(()=>{

      that.addInitData();

    },500)

  }


  addInitData(){
    var that=this;
    this.hamlets.features.forEach(element => {

      L.marker(element.geometry.location,{
        icon:that.mz})
       .bindPopup("<p>行政村："+element.properties.FNAME +"</p><p>下属自然村有"+ element.properties.count+"个</p>")
        .addTo(that.boundaryLayer).openPopup().on('click',function(){ 
        
          that.boundaryLayer.clearLayers();

          element.children.forEach(hamlet => {
            var icon;
            switch(hamlet.type){
             case "适建村":
             icon=that.m2;
             break;
             case "限建村":
             icon=that.m3;
             break;
             case "禁建村":
             icon=that.m1;
             break;
            };
             L.marker(hamlet.location,{ icon:icon})
       .bindPopup("<p>"+hamlet.name +"("+ hamlet.type+")</p><p>户数："+ hamlet.hcount+"</p><p>人口："+ hamlet.people+"</p><p>描述：暂无描述</p>")
        .addTo(that.boundaryLayer).on('click',function(){
          that.showCard=true;
          that.mapheight="60%";
          that.cardTitle=hamlet.name;
          that.hcount=hamlet.hcount;
          that.people=hamlet.people;
          that.type=hamlet.type;
        })
      });
       });

      
   })

  }

  imageChange(params) {
    const { files, type, index } = params;
    this.files = files;
  }

  addImageClick(e) {
    e.preventDefault();
    this.files = this.files.concat({
      url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
    });
  }

  imageClick(params) {
    console.log(params);
  }

  callBack(){
    this.showCard=false;
    this.mapheight="100%";
    this.boundaryLayer.clearLayers();
    this.addInitData();
  }

}
