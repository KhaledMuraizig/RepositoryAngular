import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthenticationInterceptor } from './Interceptors/authentication.interceptor';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { NewCityComponent } from './new-city/new-city.component';
import { CityListComponent } from './city-list/city-list.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NewCountryComponent,
    CountryListComponent,
    NewCityComponent,
    CityListComponent,
    NewWarehouseComponent,
    WarehouseListComponent,
    NewItemComponent,
    ItemListComponent,
    LogInComponent,
    RolesListComponent,
    UsersListComponent,
    NewUserComponent,
    NewRoleComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
