import { ITerritoryItem } from './territory';

export interface IOutletItem {
  id: string;
  name: string;
  territory: Pick<ITerritoryItem, 'id' | 'name'>;
}
