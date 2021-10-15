import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { VersionsComponent } from './components/versions/versions.component';
import { VersionsChangesComponent } from './components/versions-changes/versions-changes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VersionsChangesPublicComponent } from './components/home/versions-changes/versions-changes.component';
import { VersionsPublicComponent } from './components/home/versions/versions.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    VersionsComponent,
    VersionsChangesComponent,
    NavbarComponent,
    HomeComponent,
    VersionsChangesPublicComponent,
    VersionsPublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    FontAwesomeModule,
    NgbModule,
    CommonModule,
    AngularEditorModule 
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
