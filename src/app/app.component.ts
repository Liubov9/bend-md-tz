import {Component, OnInit} from '@angular/core';
import { data } from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bend-md-project';

   myData = data
   zones = []

  constructor() {}

  
  ngOnInit() {

    let sortedDatabyAreaId =  this.groupNew(this.myData) 
    let groupValues = []  

    groupValues.push(...Object.values(sortedDatabyAreaId))

    for(let card of groupValues){
      this.zones.push(this.childrenGroupChecker(card))
    }

  }

  public groupNew (data) {
 
    return data.reduce(function(group, item, index, originData){
      const { id, areaId } = item;

      if(item.joinedWith == null) {
        let childs = originData.filter((child) => id == child.joinedWith);
        if(childs.length) {
          item['childs'] = childs;
        }
        group[areaId] = group[areaId] ?? [];
        group[areaId].push(item);
      }
      return group
  }, {})
  }

     // recursive function for create 1 array with card children
     public childrenGroupChecker(theList) {
      let newList = [];  
  
      theList.map((listItem) => {
        newList.push(listItem);
      
        if (listItem.childs?.length > 0 ) {
          newList.push(...this.childrenGroupChecker(listItem?.childs));
        }
      });
  
      return newList;
    }

 
}
