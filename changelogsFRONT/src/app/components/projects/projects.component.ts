import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import {Router} from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {

  public status: string;
  public projects: Array<Project>;
  
  constructor(
    private _projectService: ProjectService,
    private _router: Router, 
  ) { 
    this.status =  '';
    this.projects = [];
  }

  ngOnInit(): void {
    this._projectService.getProjects().subscribe(
      (response) => {
          console.log(response.res);
          for(let proj of response.res){
            let tempProject = new Project(proj.id,proj.project_name,proj.company,proj.state.data[0]); 
            this.projects.push(tempProject); 
          }
          console.log(this.projects);
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
      ); 
    }

    viewVersion(): void{
      console.log("hola");
      this._router.navigate(['/versions/'+1]);
    }
}
