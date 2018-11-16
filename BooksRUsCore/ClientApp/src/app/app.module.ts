import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RecommendationComponent} from "./recommendation/recommendation.component";
import {BookComponent} from "./book/book.component";
import {RecommendationService} from "./recommendation/recommendation.service";
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecommendationComponent,
    BookComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'vote', component: VoteComponent, pathMatch: 'full'},
    ]),
  ],
  providers: [RecommendationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
