import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ImpressumPage } from './../impressum/impressum';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ImpressumPage;

  constructor() {

  }
}
