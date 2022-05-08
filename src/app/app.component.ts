import { Component, OnInit } from '@angular/core';
import { data } from './data.json';
import { ICard } from './models/zone-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bend-md-project';

  myData: ICard[];
  zones = [];

  constructor() {}

  ngOnInit() {
    this.myData = data;

    let sortedDatabyAreaId = this.groupNew(this.myData);
    let groupValues = [];

    groupValues.push(...Object.values(sortedDatabyAreaId));

    groupValues.map((card: ICard[]) => {
      this.zones.push(this.childrenGroupChecker(card));
    });
  }

  public groupNew(data: ICard[]) {
    return data.reduce(function (
      group: any,
      item: ICard,
      index: number,
      originData: ICard[]
    ) {
      const { id, areaId } = item;

      if (item.joinedWith == null) {
        let childs = originData.filter((child) => id == child.joinedWith);
        if (childs.length) {
          item['childs'] = childs;
        }
        group[areaId] = group[areaId] ?? [];
        group[areaId].push(item);
      }

      return group;
    },
    {});
  }

  // recursive function for create 1 array with card children
  public childrenGroupChecker(theList: ICard[]) {
    let newList = [];

    theList.map((listItem: ICard) => {
      newList.push(listItem);

      if (listItem.childs?.length > 0) {
        newList.push(...this.childrenGroupChecker(listItem?.childs));
      }
    });

    return newList;
  }
}
