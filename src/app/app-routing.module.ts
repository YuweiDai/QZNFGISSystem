import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryPlanComponent } from './country-plan/country-plan.component';
import { LandUseComponent } from './land-use/land-use.component';
import { HouseManageComponent } from './house-manage/house-manage.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'HouseManage', component: HouseManageComponent },
  { path: 'LandUse', component: LandUseComponent },
  { path: 'CountryPlan', component: CountryPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
