import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsService } from './services/service.index';
import { Component } from '@angular/core';

/* import esMessages from "devextreme/localization/messages/es.json";

import { locale, loadMessages } from "devextreme/localization"; */

import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";
 
// Dictionaries for German and Russian languages
import esMessages from "devextreme/localization/messages/es.json";

 
// Common and language-specific CLDR JSONs
import supplemental from "devextreme-cldr-data/supplemental.json";
import esCldrData from "devextreme-cldr-data/es-US.json";

 
import Globalize from "globalize";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _ajustes: SettingsService){

       /*  loadMessages(esMessages);
        
        locale(navigator.language); */

        Globalize.load(
          supplemental, esCldrData
      );
      Globalize.loadMessages(esMessages);
      
      Globalize.locale(navigator.language);

      
    
  }
  
}
