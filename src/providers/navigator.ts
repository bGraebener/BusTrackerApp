import { LaunchNavigator, LaunchNavigatorOptions, Geolocation } from 'ionic-native';
import { BusStop} from '../app/busStop';

export class Navigator{

constructor(){}

static navigate(busStop:BusStop){
  Geolocation.getCurrentPosition().then(res => {
        
        let stopLat: number = parseFloat(busStop.latitude);
        let stopLon: number = parseFloat(busStop.longitude);
                
        let options: LaunchNavigatorOptions = {          
          app: LaunchNavigator.APP.GOOGLE_MAPS,          
          transportMode: LaunchNavigator.TRANSPORT_MODE.WALKING          
        };
        
        LaunchNavigator.navigate([stopLat, stopLon], options);

  })};

}