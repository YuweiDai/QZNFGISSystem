import L from 'leaflet';
import { Component, OnInit,ViewEncapsulation,ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import { PickerService } from 'ng-zorro-antd-mobile';
import { LayoutService } from '../services/layout.service';
import { GeodataService } from '../services/geodata.service';

const data = [
  {
    url: '../../assets/content/1.jpg'
  },
  {
    url: '../../assets/content/2.jpg'
  }
];

@Component({
  selector: 'app-land-use',
  templateUrl: './land-use.component.html',
  styleUrls: ['./land-use.component.less']
})
export class LandUseComponent implements OnInit {

  map: any;
  qzBou: any;
  counties: any;
  towns:any;
  searchBarWidth:number;
  boundaryLayer: any;
  labelMarkerLayer: any;
  delayData = [];
  countriesList=[];
  townsList=[];
  files = data.slice(0);
  multiple = false;
  boundaryStyles: any;



  //村庄数据
  seasons = [
    {
      label: '柯城区',
      children: [
        {
          label: '航埠镇',
          children: [{
            label:'宋家垅村'
          },{
            label:'河山村'
          }]
        },
        {
          label: '沟溪乡',
          children: [
            {
          label:'余东村'
            },
            {
          label:'洞头村'
            },
            {
          label:'直力村'
            }
          ]
        }
      ]
    },
    {
      label: '衢江区',
      children: [
        {
          label: '云溪乡'
        },
        {
          label: '杜泽镇'
        }
      ]
    }
  ];
  name = '选择';
  value = [];
  //乡镇数据
  initData: Array<any>;
  show: boolean = false;
  menuHeight: number = document.documentElement.clientHeight * 0.6;
  dataMenu: Array<any> = [
    {
      value: '1',
      label: '柯城区',
      children: [
        {
          label: '航埠镇',
          value: '1'
        },
        {
          label: '沟溪乡',
          value: '2'
        },
        {
          label: '石梁镇',
          value: '3'
        },
        {
          label: '石室乡',
          value: '4'
        },
        {
          label: '华墅乡',
          value: '5'
        },
        {
          label: '姜家山乡',
          value: '6'
        }
      ]
    },
    {
      value: '2',
      label: '衢江区',
      children: [
        {
          label: '七里乡',
          value: '1'
        },
        {
          label: '九华乡',
          value: '2'
        },
        {
          label: '万田乡',
          value: '3'
        },
        {
          label: '杜泽镇',
          value: '4'
        }
      ]
    },
    {
      value: '3',
      label: '常山县',
      children: [
        {
          label: '天马镇',
          value: '1'
        }
      ]
    }
  ];
  //县区数据
  initData1: Array<any>;
  show1: boolean = false;
  data1: Array<any> = [
    {
      value: '1',
      label: '柯城区'
    },
    {
      value: '2',
      label: '衢江区'
    },
    {
      value: '3',
      label: '江山市'
    },
    {
      value: '4',
      label: '常山县'
    },
    {
      value: '5',
      label: '开化县'
    },
    {
      value: '6',
      label: '龙游县'
    }
  ];
  showCard: boolean = false;
  mapheight="100%";
  cardTitle="";
  czarea="";
  fkarea="";
  gdarea="";
  kzarea="";
  icon:any;

  constructor(private el:ElementRef,private _picker: PickerService,private mapService: MapService,private layoutService:LayoutService,private geoDataService: GeodataService) { 
    this.searchBarWidth=layoutService.getActualScreenSize().width;
    geoDataService.getQZBou().subscribe(q => this.qzBou = q);
    geoDataService.getCountyBou().subscribe(q => this.counties = q);
    geoDataService.getTownBou().subscribe(q => this.towns = q);

    this.icon = L.icon({
      iconUrl: '../../assets/images/m1.png',
      iconAnchor: [12, 12],
  });

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
    var that=this;
    that.map =that.mapService.createMap('map',[28.905527517199516, 118.50629210472107],7);

    that.boundaryLayer = L.featureGroup().addTo(that.map);
    that.labelMarkerLayer = L.featureGroup().addTo(that.map);

     
  

  }


  
  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  getValue(result) {
    let value = [];
    let temp = '';
    result.forEach(item => {
      value.push(item.value || item);
      temp += item.value || item;
    });
    return value;
  }
//村庄选择器
  showPicker() {
    PickerService.showPicker(
      { value: this.value, data: this.seasons },
      result => {
       
        L.marker([28.982185050845146, 118.72790694236755],{icon:this.icon}).addTo(this.map)
       .bindPopup('<p>村庄建设用地面积：148.50亩</p><p>复垦为耕地面积：00.00亩</p><p>耕地提升后备资源面积：458.01亩</p><p>垦造耕地后备资源面积：623.14亩</p>')
        .openPopup();
        this.map.setView([28.982185050845146, 118.72790694236755],16);
        this.name = this.getResult(result);
        this.value = this.getValue(result);
        this.showCard=true;
        this.mapheight="60%";
        this.cardTitle="余东村";
        this.czarea="148.50亩";
        this.fkarea="00.00亩";
        this.gdarea="458.01亩";
        this.kzarea="623.14亩";

       
      },
      cancel => {
        console.log('cancel');

      }
    );
  };




//复选框功能模块
  onChange(value) {
    var that=this;
    this.towns.features.forEach(element => {
       if(value[1].indexOf(element.properties.id) != -1){
        this.show = false;
      /*   var polygon = L.polygon(element.geometry.coordinates, {color: 'red'}).addTo(this.map); */

        L.geoJSON(element, {
          style: function (feature) {
            return { color: feature.properties.color };
          }
        }).addTo(this.boundaryLayer).on('click',function(){ 
         
       that.showCard=true;
       that.mapheight="60%";
       that.cardTitle=element.properties.FNAME;
       that.czarea=element.properties.czarea;
       that.fkarea=element.properties.fkarea;
       that.gdarea=element.properties.gdarea;
       that.kzarea=element.properties.kzarea;
       that.map.fitBounds(element.geometry.coordinates);
       //加载图片



        });

        this.countriesList.push(element.properties.id);
       }
    })



    console.log(value);
  }
//乡镇选择器
  handleClick() {
    //e.preventDefault();
    console.log(this.show);
    this.show = !this.show;
    if (!this.initData) {
      setTimeout(() => {
        this.initData = this.dataMenu;
      }, 500);
    }
  }

  onMaskClick() {
    this.show = false;
  }

  onOk(value) {
    console.log(value);
    this.onCancel();
  }

  onCancel() {
    this.show = false;
  }


  
 
//县区选择器
  handleClick1() {
    this.show1 = !this.show1;
    if (!this.initData1) {
      setTimeout(() => {
        this.initData1 = this.data1;
      }, 500);
    }
  }

  onMaskClick1() {
    this.show1 = false;
  }

  onOk1(value) {
    console.log(value);
    this.onCancel1();
  }

  onCancel1() {
    console.log('onCancel');
    this.show1 = false;
  }
  onChange1(value) {
  var that=this;
    this.counties.features.forEach(element => {
       if(value.indexOf(element.properties.id) != -1){
        this.show1 = false;
      /*   var polygon = L.polygon(element.geometry.coordinates, {color: 'red'}).addTo(this.map); */

        L.geoJSON(element, {
          style: function (feature) {
            return { color: feature.properties.color };
          }
        }).addTo(this.boundaryLayer).on('click',function(){ 
         
       that.showCard=true;
       that.mapheight="60%";
       that.cardTitle=element.properties.FNAME;
       that.czarea=element.properties.czarea;
       that.fkarea=element.properties.fkarea;
       that.gdarea=element.properties.gdarea;
       that.kzarea=element.properties.kzarea;
       that.map.setView(element.geometry.coordinates,15);
       //加载图片



        });

        this.countriesList.push(element.properties.id);
       }
    })

    console.log(value);
  }


  chooseCounty(){
    this.showCard=false;
    this.mapheight="100%";
    this.handleClick1();
  }

  chooseTown(){
    this.showCard=false;
    this.mapheight="100%";
    this.handleClick();
  }
  chooseVillage(){
    this.showCard=false;
    this.mapheight="100%";
    this.showPicker();
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

 
}
