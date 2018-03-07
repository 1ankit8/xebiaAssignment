import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllPlanetsComponent } from "./all-planets/all-planets.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { PlanetComponent } from "./planet/planet.component";
import { ErrorComponent } from "./error/error.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes : Routes = [
    {path : '', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'error/:errorCode', component:ErrorComponent},
    {path:'user', component:UserComponent, children:[
        {path : '', redirectTo:'allPlanets', pathMatch:'full'},
        {path:'allPlanets', component:AllPlanetsComponent},
        {path:'planets/:id', component:PlanetComponent},
    ]},
    {path:'**', component:PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}