import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { VersionsComponent } from './components/versions/versions.component';
import { VersionsChangesComponent } from './components/versions-changes/versions-changes.component';
import { HomeComponent} from './components/home/home.component';
import { VersionsPublicComponent } from "./components/home/versions/versions.component";
import { VersionsChangesPublicComponent } from "./components/home/versions-changes/versions-changes.component";

const appRoutes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'versions/:idProject', component: VersionsPublicComponent},
    {path:'versionsChanges/:idVersion/project/:idProject', component: VersionsChangesPublicComponent},
    {path:'projects', component: ProjectsComponent},
    {path:'project/:idProject', component: ProjectsComponent},
    {path:'project/:idProject/versions', component: VersionsComponent},
    {path:'project/:idProject/version/:idVersion', component: VersionsComponent},
    {path:'project/:idProject/version/:idVersion/versionsChanges', component: VersionsChangesComponent},
    {path:'project/:idProject/version/:idVersion/versionsChange/:idVersionChanges', component: VersionsChangesComponent},
    {path:'**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

