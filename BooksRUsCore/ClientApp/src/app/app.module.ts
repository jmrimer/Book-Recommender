import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RecommendationComponent} from "./recommendation/recommendation.component";
import {BookComponent} from "./book/book.component";
import {EmotionService} from "./emotion.service";
import {RecommendationService} from "./recommendation/recommendation.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecommendationComponent,
    BookComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
    ]),
  ],
  providers: [RecommendationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
