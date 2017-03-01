import { Component, ViewChild } from '@angular/core';

import { NavController, Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Times } from '../../providers/times';
import { BusStop } from '../../app/busStop';
import { SearchResultsPage } from '../search-results/search-results'
import { Geolocation, SpinnerDialog } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  numOfStops: number = 5;
  stopName: string = "";
  busStopArray: BusStop[] = [];
  // ownLat: number;
  // ownLon: number;

  constructor(public navCtrl: NavController, private times: Times) {
  }

  /*  function to retrieve the busstops closest to the device and
      shows a spinner dialog while calculating.
      the function retrieves the devices coordinates and the information for the busstops.
      It then stores the busstop information in an array of the custom type "BusStop"
      and sorts the array by order of distance to the device.
      An array of user specified length is used to show the appropriate number of busstops in the view.
  */
  computeDistance() {
    SpinnerDialog.show("Finding closest Busstops...", "Calculating...");

    Geolocation.getCurrentPosition({ enableHighAccuracy: false }).then((resp) => {
      let ownLat = resp.coords.latitude;
      let ownLon = resp.coords.longitude;

      let tempArray: BusStop[] = [];
      this.busStopArray = [];

      this.times.getBusStopInfo().subscribe(
        res => {      
         
          //storing all busstops in an array
          for (var i = 0; i < res.results.length; i++) {
            tempArray.push(new BusStop(res.results[i].latitude, res.results[i].longitude,
              res.results[i].stopid, res.results[i].fullname, res.results[i].operators));
            tempArray[i].calculateDistanceToDevice(ownLat, ownLon);

          }

          //sorting the array by order of distance to device
          tempArray.sort((a, b) => a.distance - b.distance);

          //filling the array used to display in the view
          for (var i = 0; i < this.numOfStops; i++) {
            this.busStopArray[i] = tempArray[i];
            // console.log(this.busStopArray[i]);
          }

          SpinnerDialog.hide();

          //opening the page that displays the closest busstops 
          this.navCtrl.push(SearchResultsPage, { stops: this.busStopArray });

        });

    }).catch((error) => {
      alert("Couldn't retrieve devices location!");
      console.log('Error getting location', error);
    });
  }

  //Function that retrieves information about a user defined busstop
  //It searches in the fullname property of all bus stops for the user query and 
  //shows a list of all found bus stops or an alert that no matching stop could be found
  searchByName() {
    if (this.stopName.trim().length < 1) {
      return;
    }

    SpinnerDialog.show("Finding Busstops...", "Calculating...");
    this.busStopArray = [];

    Geolocation.getCurrentPosition().then(res => {
      let ownLat = res.coords.latitude;
      let ownLon = res.coords.longitude;

      this.times.getBusStopInfo().subscribe((res) => {

        for (var i = 0; i < res.results.length; i++) {
          if (res.results[i].fullname.toLowerCase().includes(this.stopName.toLowerCase())) {

            this.busStopArray.push(new BusStop(res.results[i].latitude, res.results[i].longitude,
              res.results[i].stopid, res.results[i].fullname, res.results[i].operators));
          }
        }

        //calculating distances to all found stops
        for (var i = 0; i < this.busStopArray.length; i++) {
          this.busStopArray[i].calculateDistanceToDevice(ownLat, ownLon);
        }

        this.busStopArray.sort((a, b) => a.distance - b.distance);

        SpinnerDialog.hide();

        if (this.busStopArray.length > 0) {
          this.navCtrl.push(SearchResultsPage, { stops: this.busStopArray });
        } else {
          alert("No Busstop with this name found!");
        }

      });
    });

  }

}
