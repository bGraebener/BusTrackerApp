import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchResultsPage } from '../pages/search-results/search-results';
import { TimetablesPage } from '../pages/timetables/timetables';
import { Times} from '../providers/times';
import { Navigator} from '../providers/navigator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultsPage, 
    TimetablesPage
  
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultsPage, 
    TimetablesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Times, Navigator]
})
export class AppModule {}
