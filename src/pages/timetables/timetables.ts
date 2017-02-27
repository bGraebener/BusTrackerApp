import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusStop } from '../../app/busStop';
import { Navigator } from '../../providers/navigator';
import { Times } from '../../providers/times';

@Component({
  selector: 'page-timetables',
  templateUrl: 'timetables.html'
})
export class TimetablesPage {

  bussesDue: any;
  bussesDueFive: BusStop[] = [];

  busStop: BusStop;

  constructor(public navCtrl: NavController, public navParams: NavParams, private times: Times) {
    this.bussesDue = this.navParams.get("busses");
    this.busStop = this.navParams.get('stopInfo');

    //Only show the next five busses due at the stop for viewability
    for (var i = 0; i < 5; i++) {
      this.bussesDueFive[i] = this.bussesDue[i];
    }
  }

  //Function to call the Navigator service with the selected bus stop information
  navigate() {
    Navigator.navigate(this.busStop);
  }

  //drag down to refresh bus due times
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.times.getTimeTable(this.busStop.stopid).subscribe(res => {
      this.bussesDue = res.results;
      for (var i = 0; i < 5; i++) {
        this.bussesDueFive[i] = this.bussesDue[i];
      }
    })

    setTimeout(() => {
      console.log('Async operation has ended');      
      refresher.complete();
    }, 2000);
  }

}
