import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {
  
  studio: string;
  time: string;
  day: string;
  courseName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.studio = this.navParams.get("studio");
    this.time = this.navParams.get("time");
    this.day = this.navParams.get("day");
    this.courseName = this.navParams.get("courseName");
  }
}
