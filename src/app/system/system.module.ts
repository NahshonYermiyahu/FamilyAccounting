import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {SystemRoutingModule} from './system-routing.module';
import {FormsModule} from '@angular/forms';
import {SystemComponent} from './system.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import {HeaderComponent} from './shared/header/header.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import {SharedModule} from '../shared/shared.module';
import {EventService} from './shared/services/event.service';
import {CategoriesService} from './shared/services/categories.service';
import {BillService} from './shared/services/bill.service';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import {FilterPipe} from './shared/pipes/filter.pipe';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {AppModule} from '../app.module';



@NgModule({
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    HistoryDetailComponent,
    HeaderComponent,
    BillCardComponent,
    CurrencyCardComponent,
    AddCategoryComponent,
    AddEventComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryFilterComponent,
    FilterPipe,
    MomentPipe
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    HeaderComponent
  ],
  providers: [
    BillService,
    CategoriesService,
    EventService
  ]
})
export class SystemModule { }
