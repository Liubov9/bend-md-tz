export interface ICard {
  id: number;
  areaId: number;
  joinedWith: null | number;
  sku: string;
  defaultSku: string;
  status: string;
  countActive: number;
  childs?: ICard[];
}
