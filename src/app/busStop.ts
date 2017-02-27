//


export class BusStop {
    stopid: string;
    latitude: string;
    longitude: string;
    name: string;
    distance: number;
    operators: any[];


    constructor(latitude: string, longitude: string, stopid: string, name: string, operators: any[]) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.stopid = stopid;
        this.name = name;
        this.operators = operators;
    }


    //function to compute distance between two coordinates 
    //formula taken from: 
    //http://www.movable-type.co.uk/scripts/latlong.html
    calculateDistanceToDevice(latDevice: number, lonDevice: number): number {
        let lat1Num: number = parseFloat(this.latitude);
        let lon1Num: number = parseFloat(this.longitude);
        let lat2Num: number = latDevice;
        let lon2Num: number = lonDevice;

        var R = 6371e3; // metres

        let φ1: number = lat1Num * Math.PI / 180;
        let φ2: number = lat2Num * Math.PI / 180;
        let Δφ: number = (lat2Num - lat1Num) * Math.PI / 180;
        let Δλ: number = (lon2Num - lon1Num) * Math.PI / 180;

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        this.distance = R * c / 1000;
        return this.distance;
    }
}