import L from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { PickerService } from 'ng-zorro-antd-mobile';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-land-use',
  templateUrl: './land-use.component.html',
  styleUrls: ['./land-use.component.less']
})
export class LandUseComponent implements OnInit {

  delayData = [];
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


  constructor(private _picker: PickerService) {
    setTimeout(() => {
      //this.delayData = this.data;
    }, 10000);
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

  showPicker() {
    PickerService.showPicker(
      { value: this.value, data: this.seasons },
      result => {
        
        this.name = this.getResult(result);
        this.value = this.getValue(result);
      },
      cancel => {
        console.log('cancel');

      }
    );
  }
  // map: any;
  //searchBarWidth:number;
 // constructor(private mapService: MapService,private layoutService:LayoutService) { 
    //this.searchBarWidth=layoutService.getActualScreenSize().width;

  //}

  ngOnInit() {  
   // this.map =this.mapService.createMap('map',[28.905527517199516, 118.50629210472107],7);
  } 
}
