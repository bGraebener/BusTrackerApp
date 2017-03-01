import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { BusStop } from '../../app/busStop';
import { TimetablesPage } from '../timetables/timetables';
import { Times } from '../../providers/times';
import { Navigator } from '../../providers/navigator';

@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsPage {

  @ViewChild(Slides) slides: Slides;

  busStopArray: BusStop[];
  bussesDue: any;
  bussesDueFive: BusStop[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private times: Times) {

    this.busStopArray = this.navParams.get('busStopArray');
  }

  ionViewDidLoad() {
    
  }

  showTimeTable(){
    let current = this.slides.getActiveIndex();
    console.log(current);
  }

  //function to retrieve data about a specific bus stop
  showTimetable(stop: BusStop) {

    this.times.getTimeTable(stop.stopid).subscribe(res => {
      this.bussesDue = res.results;

      for (var i = 0; i < 5; i++) {
        this.bussesDueFive[i] = this.bussesDue[i];
      }

      this.navCtrl.push(TimetablesPage, { stopInfo: stop, busses: res.results });
    })
  }



  //function that calls the navigator service and provides the bus stop info
  navigate(stop: BusStop) {
    Navigator.navigate(stop);
  }


}
