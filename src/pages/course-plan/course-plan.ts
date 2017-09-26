import { Injectable } from '@angular/core';
import { BookingPage } from './../booking/booking';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-course-plan',
  templateUrl: 'course-plan.html'
})
export class CoursePlanPage {
  
  studio: string;
  public csvItems : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.studio = this.navParams.get("studio");
  }

  showBookingPage(time: string , day: string , courseName: string)
  {
    this.navCtrl.push(BookingPage,{studio: this.studio, time: time, day: day, courseName: courseName});
  }

  loadCSV()
  {
     this.http.get('assets/data/kursplan_amberg.csv')
     .map(res => res.text())
     .subscribe((data)=>
     {
        console.log(data);
        this.csvItems = this.csvJSON(data);
        var csv     = this.parseCSVFile(data);
        //this.csvItems = this.formatParsedObject(csv);
     });
  }
  ionViewWillEnter()
  {
     this.loadCSV();
  }
  parseCSVFile(str)
  {
     var arr  = [],
         row,
         col,
         c,
         quote   = false;  // true means we're inside a quoted field
  
     // iterate over each character, keep track of current row and column (of the returned array)
     for (row = col = c = 0; c < str.length; c++)
     {
        var cc = str[c],
            nc = str[c+1];        // current character, next character
  
        arr[row]           = arr[row] || [];
        arr[row][col]  = arr[row][col] || '';
  
        /* If the current character is a quotation mark, and we're inside a
      quoted field, and the next character is also a quotation mark,
      add a quotation mark to the current column and skip the next character
        */
        if (cc == ';' && quote && nc == ';')
        {
           arr[row][col] += cc;
           ++c;
           continue;
        }
  
  
        // If it's just one quotation mark, begin/end quoted field
        if (cc == ';')
        {
           quote = !quote;
           continue;
        }
  
  
        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == '' && !quote)
        {
           ++col;
           continue;
        }
  
  
        /* If it's a newline and we're not in a quoted field, move on to the next
           row and move to column 0 of that new row */
        if (cc == '\n' && !quote)
        {
           ++row;
           col = 0;
           continue;
        }
  
        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
     }
  
     return arr;
  }

  csvJSON(csv){
    
      var lines=csv.split("\n");

      var result = [];
    
      var headers=lines[0].split(";");

      headers[0]="Time";

      for(var i=1;i<lines.length;i++){
    
        var obj = {};
        var currentline=lines[i].split(";");
    
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
    
        result.push(obj);
    
      }
      return result; 
    }
  
  formatParsedObject(arr)
  {
     let time,
         mon,
         die,
         mit,
         don,
         fre,
         sam,
         son,
         obj = [];
  
     for(var j = 0; j < arr.length; j++)
     {
        var items         = arr[j];
              obj.push({
                time        : items[0],
                mon         : items[1],
                die         : items[2],
                mit         : items[3],
                don         : items[4],
                fre         : items[5],
                sam         : items[6],
                son         : items[7]
              });   
     }
     return obj;
  }
}