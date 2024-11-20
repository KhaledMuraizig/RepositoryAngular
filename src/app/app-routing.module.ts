import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { NewCityComponent } from './new-city/new-city.component';
import { CityListComponent } from './city-list/city-list.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path:"",component:LogInComponent},
  {path:"Home",component:DashboardComponent,children:[
    {path:"NewCountry",component:NewCountryComponent},
    {path:"CountryList",component:CountryListComponent},
    {path:"NewCity",component:NewCityComponent},
    {path:"CityList",component:CityListComponent},
    {path:"NewWarehouse",component:NewWarehouseComponent},
    {path:"WharehouseList",component:WarehouseListComponent},
    {path:"NewItem",component:NewItemComponent},
    {path:"ItemList",component:ItemListComponent},
    {path:"NewRole",component:NewRoleComponent},
    {path:"RolesList",component:RolesListComponent},
    {path:"NewUser",component:NewUserComponent},
    {path:"UsersList",component:UsersListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
