<<<<<<< HEAD
import { Component,OnInit } from '@angular/core';
import { ActionSheetService, ToastService } from 'ng-zorro-antd-mobile';
import { en_US, ru_RU, zh_CN, sv_SE, da_DK } from 'ng-zorro-antd-mobile';
=======
import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { GeodataService } from '../services/geodata.service';
import L from 'leaflet';

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
>>>>>>> 8aa249185a45ae5daaed57e65bd99a8ec6cd92cf

@Component({
  selector: 'app-country-plan',
  templateUrl: './country-plan.component.html',
  styleUrls: ['./country-plan.component.less']
})
export class CountryPlanComponent implements OnInit {
<<<<<<< HEAD
  ngOnInit(): void {

  }

  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' }
  ].map(obj => ({
    icon: `<img src="https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png" style="width:36px"/>`,
    title: obj.title
  }));

  constructor(private _actionSheet: ActionSheetService, private _toast: ToastService) {}

  showActionSheet = message => {
    const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
    ActionSheetService.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        title: 'title',
        message: message,
        maskClosable: true
      },
      buttonIndex => {
        console.log(buttonIndex);

          ActionSheetService.showActionSheetWithOptions(
      {
        options: ['Operation111', 'Operation2222', 'Operation3332', 'Delete', 'Cancel'],
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        title: 'title',
        message: message,
        maskClosable: true
      });
      }
    );
=======
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
files = data.slice(0);

  constructor(private mapService: MapService,private geoDataService: GeodataService) { 
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

      that.hamlets.features.forEach(element => {

        L.marker(element.geometry.location,{
          icon:this.mz})
         .bindPopup("<p>行政村："+element.properties.FNAME +"</p><p>下属自然村有"+ element.properties.count+"个</p>")
          .addTo(this.boundaryLayer).openPopup().on('click',function(){ 
          
            that.boundaryLayer.clearLayers();
  
            element.children.forEach(hamlet => {
              var icon;
              switch(hamlet.type){
               case "适建村":
               icon=that.m1;
               break;
               case "限建村":
               icon=that.m2;
               break;
               case "禁建村":
               icon=that.m3;
               break;
              };
               L.marker(hamlet.location,{ icon:icon})
         .bindPopup("<p>"+hamlet.name +"("+ hamlet.type+")</p><p>户数："+ hamlet.hcount+"</p><p>人口："+ hamlet.people+"</p><p>描述：暂无描述</p>")
          .addTo(that.map).on('click',function(){
            that.showCard=true;
            that.mapheight="60%";
            that.hcount=hamlet.hcount;
            that.people=hamlet.people;
            that.type=hamlet.type;
          })
        });
         });
  
        
     })

    },500)

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
>>>>>>> 8aa249185a45ae5daaed57e65bd99a8ec6cd92cf
  }

  showShareActionSheet = () => {
    ActionSheetService.showShareActionSheetWithOptions(
      {
        options: this.dataList,
        message: 'I am description, description, description',
        locale: zh_CN
      },
      buttonIndex => {
        return new Promise(resolve => {
          ToastService.info('closed after 1000ms');
          setTimeout(resolve, 1000);
        });
      }
    );
  }

  showShareActionSheetMulpitleLine = () => {
    const data = [[...this.dataList, this.dataList[2]], [this.dataList[3], this.dataList[4]]];
    ActionSheetService.showShareActionSheetWithOptions(
      {
        options: data,
        message: 'I am description, description, description',
        locale: en_US
      },
      (buttonIndex, rowIndex) => {
        console.log(buttonIndex);
      }
    );
  }
}
