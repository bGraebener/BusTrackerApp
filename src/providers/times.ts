import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Times {

  constructor(public http: Http) {
  }

  //function to get a list of all bus stops details in Ireland
  //and to store the details in an array to be able to sort them
  //according to distance to device later
  getBusStopInfo() {
    return this.http.get(
      "https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid&format=json"
    )
      .map((res) => res.json());
  }

  //function to get information about a specific busstop
  //contains info about busses due, their destination and route 
  getTimeTable(stopid: string) {
    return this.http.get(
      "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=" + stopid + "&format=json"
    )
      .map((res) => res.json());
  }

}
