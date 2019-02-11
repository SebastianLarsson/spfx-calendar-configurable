import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxReactFullcalendarWebPartStrings';
import SpfxReactFullcalendar from './components/SpfxReactFullcalendar';
import { ISpfxReactFullcalendarProps } from './components/ISpfxReactFullcalendarProps';

export interface ISpfxReactFullcalendarWebPartProps {
  listName: string;
  assetListName: string;
  defaultView:string;
  defaultWeekend:boolean;
  titleEvent:string;
  startDate:string;
  endDate:string;
  descriptionColumn:string;
  optionalColumn:string;
  optionalColumnName:string;
  eventID:string;
  eventColor:string;
  siteUrl:string;
  filterQuery:string;
  orderQuery:string;
}

export default class SpfxReactFullcalendarWebPart extends BaseClientSideWebPart<ISpfxReactFullcalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxReactFullcalendarProps > = React.createElement(
      SpfxReactFullcalendar,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.properties.siteUrl,
        filterQuery: this.properties.filterQuery,
        orderQuery: this.properties.orderQuery,
        //siteName: this.context.pageContext.site.serverRelativeUrl,
        listName: this.properties.listName,
        showPanel: false,
        defaultView:this.properties.defaultView,
        defaultWeekend:this.properties.defaultWeekend,
        titleEvent:this.properties.titleEvent,
        startDate:this.properties.startDate,
        endDate:this.properties.endDate,
        descriptionColumn:this.properties.descriptionColumn,
        optionalColumn:this.properties.optionalColumn,
        optionalColumnName:this.properties.optionalColumnName,
        eventColor:this.properties.eventColor,
        eventID:this.properties.eventID
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.Intro
          },
          groups: [
            {
              groupName: "",
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: strings.siteNameLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('defaultView', {
                  label: strings.defaultViewFieldLabel
                }),
                PropertyPaneCheckbox('defaultWeekend', {
                  text: strings.defaultWeekendLabel,
                  checked:true,

                }),
                PropertyPaneTextField('titleEvent', {
                  label: strings.titleEventLabel
                }),
                PropertyPaneTextField('descriptionColumn', {
                  label: strings.descriptionLabel
                }),
                PropertyPaneTextField('startDate', {
                  label: strings.startDateLabel
                }),
                PropertyPaneTextField('endDate', {
                  label: strings.endDateLabel
                }),
                ,
                PropertyPaneTextField('optionalColumnName', {
                  label: strings.optionalLabelName
                })
                ,
                PropertyPaneTextField('optionalColumn', {
                  label: strings.optionalLabel
                })
                ,
                PropertyPaneTextField('eventColor', {
                  label: strings.eventColorLabel
                })
                ,
                PropertyPaneTextField('filterQuery', {
                  label: strings.filterQueryLabel
                }),
                ,
                PropertyPaneTextField('orderQuery', {
                  label: strings.orderQueryLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
