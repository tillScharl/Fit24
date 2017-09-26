import { CoursePlanPage } from './../course-plan/course-plan';
import { Component,  ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Select } from 'ionic-angular';
import { ActionSheetController, ActionSheet } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("myselect") select: Select;

  actionsheet: ActionSheet;
  studio: string;

  constructor(public navCtrl: NavController, navParams: NavParams, public actionSheetCtrl: ActionSheetController) {

  }

  openStudioSelcet() {
    this.select.open();
  }

  showCoursePlan() {
    this.navCtrl.push(CoursePlanPage, {studio: this.studio});
  }

}
