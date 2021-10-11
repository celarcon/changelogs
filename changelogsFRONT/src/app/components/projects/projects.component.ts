import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public status: string;
  constructor(
    private _projectService: ProjectService
  ) { 
    this.status =  '';
  }

  ngOnInit(): void {
/*     this._projectService.getProjects().subscribe(
      (response) => {
          console.log(response);
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
      ); */
    }
}
