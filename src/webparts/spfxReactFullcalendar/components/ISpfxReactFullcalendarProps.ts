import { SPHttpClient } from '@microsoft/sp-http';

export interface ISpfxReactFullcalendarProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  showPanel: boolean;
  defaultView:string;
  defaultWeekend:boolean;
  titleEvent:string;
  startDate:string;
  endDate:string;
  descriptionColumn:string;
  optionalColumn:string;
  optionalColumnName:string;
  eventColor:string;
  eventID:string;
  filterQuery:string;
  orderQuery:string;
}
