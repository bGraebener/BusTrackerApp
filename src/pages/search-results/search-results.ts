import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BusStop } from '../../app/busStop';
import { TimetablesPage } from '../timetables/timetables';
import { Times } from '../../providers/times';
import { Navigator } from '../../providers/navigator';

@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsPage {

  stops: BusStop[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private times: Times) {

    this.stops = this.navParams.get('stops');
  }

  ionViewDidLoad() {
  }

  //function to retrieve data about a specific bus stop
  showTimetable(stop: BusStop) {

    this.times.getTimeTable(stop.stopid).subscribe(res => {
      this.navCtrl.push(TimetablesPage, { stopInfo: stop, busses: res.results });
    })
  }

  

  //function that calls the navigator service and provides the bus stop info
  navigate(stop: BusStop) {
    Navigator.navigate(stop);
  }


}