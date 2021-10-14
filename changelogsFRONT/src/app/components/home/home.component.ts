import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})
export class HomeComponent implements OnInit {


  public projects: Array<Project>;
  public project: Project;
  public status: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router
  ) {
    this.status = '';
    this.projects = [];
    this.project = new Project('', '', '', 0);
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projects = [];
    this._projectService.getProjects().subscribe(
      (response) => {
        for (let proj of response.res) {
          let tempProject = new Project(
            proj.id,
            proj.project_name,
            proj.company,
            proj.state
          );
          this.projects.push(tempProject);
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  viewVersions(idProject: any): void {
    this._router.navigate(['versions/' + idProject ]);
  }

}
