import L from 'leaflet';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
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

        this.name = this.getResult(result);
        this.value = this.getValue(result);
      },
      cancel => {
        console.log('cancel');

      }
    );
  };




//复选框功能模块
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

  onChange(value) {
    console.log(value);
  }
//乡镇选择器
  handleClick() {
    //e.preventDefault();
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


 /*  initData1: Array<any>;
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
      value: '3',
      label: '常山县'
    },
    {
      value: '3',
      label: '开化县'
    },
    {
      value: '3',
      label: '龙游县'
    }
  ];

  onChange1(value) {
    console.log(value);
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
    this.show = false;
  }

  onOk1(value) {
    console.log(value);
    this.onCancel();
  }

  onCancel1() {
    console.log('onCancel');
    this.show = false;
  }
 */







  choose(event) {
    switch(event.value){
      case "村庄选择器":
      this.showPicker();
      break;
      case "乡镇选择器":
      this.handleClick();
      break;
      case "县区选择器":
      this.handleClick();
      break;
    }
    console.log('index: ', event.selectedIndex, 'value: ', event.value);
  }


   map: any;
  searchBarWidth:number;
  constructor(private _picker: PickerService,private mapService: MapService,private layoutService:LayoutService) { 
    this.searchBarWidth=layoutService.getActualScreenSize().width;

  }

  ngOnInit() {  
   // this.map =this.mapService.createMap('map',[28.905527517199516, 118.50629210472107],7);
  } 
}
