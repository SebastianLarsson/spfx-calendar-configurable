import * as React from 'react';
import styles from './SpfxReactFullcalendar.module.scss';
import { ISpfxReactFullcalendarProps } from './ISpfxReactFullcalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Panel} from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {IPanelState} from './IPanelState';
import {ITask} from './ITask';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import * as FC from 'fullcalendar';
import 'popper.js';
import 'bootstrap';
require('../../../../node_modules/fullcalendar/dist/fullcalendar.min.css');
require('../../../../node_modules/bootstrap/dist/css/bootstrap.css');

export default class SpfxReactFullcalendar extends React.Component<ISpfxReactFullcalendarProps, IPanelState> {

  constructor(props: ISpfxReactFullcalendarProps, state: IPanelState){
    super(props);
    this.state = { 
      showPanel: false,
      descriptionColumn:"",
      rubrik: "",
      startDate: "",
      endDate: "",
      optionalColumn: "",
      eventID:""
    };
  }

  public componentDidMount(): void {
    $('#calendar').fullCalendar('destroy');
    this.displayTasks();
    
  }

  public componentDidUpdate(): void {
    this.displayTasks();
  }

  public render(): React.ReactElement<ISpfxReactFullcalendarProps> {
    return (
      <div className={ styles.spfxReactFullcalendar}>
        
        <div className="ms-Grid">
          <div style={{marginBottom: '20px'}}></div>
          <div className="ms-Grid-row">
          <div id="calendar"></div>
          </div>
        </div>
        <Panel isOpen={this.state.showPanel} onDismiss={this.onPanelClosed.bind(this)} isLightDismiss={true}
          customWidth="500px" closeButtonAriaLabel="Close">
          <Label style={{fontWeight: "bolder", textAlign: "center", marginBottom: "30px"}}>Event details</Label>
          <Label style={{fontWeight: "bold"}}>Name</Label>
          <Label>{this.state.rubrik}</Label>
          <Label style={{fontWeight: "bold"}}>Description</Label>
          <Label>{this.state.descriptionColumn}</Label>
          <Label style={{fontWeight: "bold"}}>Start Date and Time</Label>
          <Label>{this.state.startDate}</Label>
          <Label style={{fontWeight: "bold"}}>End Date and Time</Label>
          <Label>{this.state.endDate}</Label>
          <Label style={{fontWeight: "bold"}}>{this.props.optionalColumnName}</Label>
          <Label>{this.state.optionalColumn}</Label>
          <br></br><br></br>
          <a href={this.props.siteUrl + "/Lists/" + this.props.listName + "/DispForm.aspx?ID=" + this.state.eventID} target='_blank'>Open this event in a form to view or edit</a>
          <br></br><br></br>
          <Label>To delete an event, you have to do that in the list. Click 'Open event list'</Label>
        </Panel>
      </div>

    );
  }

  private setShowPanel(showPanel: boolean) {
    this.setState({
      showPanel: showPanel
    });
  }

  private onPanelClosed() {
    this.setState({
      showPanel: false
    });
  }

  private displayTasks(): void {
    $('#calendar').fullCalendar({
      customButtons: {
        myCustomButton: {
          text: 'New event',
          click: () => {
            window.open(`${escape(this.props.siteUrl)}/Lists/${escape(this.props.listName)}/NewForm.aspx`);
          }
        },
        myCustomButtonTwo: {
          text: 'Open event list',
          click: () => {
            window.open(`${escape(this.props.siteUrl)}/Lists/${escape(this.props.listName)}`);
          }
        }
      },
      weekends: this.props.defaultWeekend,
      header: {
        left: 'prev,next today myCustomButton myCustomButtonTwo',
        center: 'title',
        right: 'month,agendaWeek,basicWeek,agendaDay,listMonth'
      },
      buttonText: {
        basicWeek: 'BasicWeek',
      },
      displayEventTime: true,
      navLinks: true,
      weekNumbers:true,
      defaultView:this.props.defaultView,
      firstDay:1,
      views: {
        agenda: {
          columnHeaderFormat:'ddd D/M',
        },
        week: {
          columnHeaderFormat:'ddd D/M',
          scrollTime: '07:00:00',
        },
        month: {
          eventLimit: 7
        },
        day: {
          scrollTime: '07:00:00',
        }
        },
        businessHours: {
          
          dow: [ 1, 2, 3, 4, 5 ], 
        
          start: '07:00', 
          end: '18:00', 
        },
      timeFormat: 'HH:mm',
      slotLabelFormat: 'HH:mm',
      // open up the display form when a user clicks on an event
      eventClick: (calEvent: FC.EventObjectInput, jsEvent: MouseEvent, view: FC.View) => {
        this.setState({
          rubrik: calEvent.title,
          descriptionColumn:calEvent.description,
          startDate:calEvent.CustomStartDate,
          endDate:calEvent.CustomEndDate,
          optionalColumn:calEvent.optionalCol,
          eventID:calEvent.idd
        });
        
        this.setShowPanel(true);
        
      },
      eventRender: function(eventObj, $el) {
        $el.popover({
          title: eventObj.title,
          content: '<i>Press the event to see the edit form </i><br/><br/>' + 'Start: ' + eventObj.CustomStartDate + '<br/>End: ' + eventObj.CustomEndDate + '<br/>Description: ' + eventObj.description + '<br/> --------- <br/>' + eventObj.optionalCol,
          trigger: 'hover',
          html:true,
          placement: 'bottom',
          container: 'body'
        });
      },
      // put the events on the calendar 
      events: (start: moment.Moment, end: moment.Moment, timezone: string, callback: Function): void => {
        let startDate: string = start.format('YYYY-MM-DD');
        startDate += 'T00:00:00.0000000Z';
        let endDate: string = end.format('YYYY-MM-DD');
        endDate += 'T00:00:00.0000000Z';
        
        const restQuery: string = `/_api/Web/Lists/GetByTitle('${escape(this.props.listName)}')/items?$select=ID,${escape(this.props.titleEvent)},${escape(this.props.startDate)},${escape(this.props.endDate)},${escape(this.props.descriptionColumn)},${escape(this.props.optionalColumn)},${escape(this.props.eventColor)}&$orderby=Id desc&$top=1000&$filter=${this.props.filterQuery}`;
        console.log(restQuery);
        this.props.spHttpClient.get(this.props.siteUrl + restQuery, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': "application/json;odata.metadata=none"
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: ITask[] }> => {
          return response.json();
        })
        .then((data: { value: ITask[] }): void => {
          const events: FC.EventObjectInput[] = data.value.map((list: any): FC.EventObjectInput => {
                        
            return {
              title: list[this.props.titleEvent],
              id: list['ID'],
              idd: list['ID'],
              description: list[this.props.descriptionColumn],
              optionalCol: list[this.props.optionalColumn],
              start: moment.utc(list[this.props.startDate]).local().format('YYYY-MM-DD HH:mm'),
              end: moment.utc(list[this.props.endDate]).local().format('YYYY-MM-DD HH:mm'),
              CustomStartDate: moment(list[this.props.startDate]).format('YYYY-MM-DD HH:mm'),
              CustomEndDate: moment(list[this.props.endDate]).format('YYYY-MM-DD HH:mm'),
              color: list[this.props.eventColor]
            };
          });
          callback(events);
        });
      },

    });
  }

}
