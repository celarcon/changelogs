import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { Router } from '@angular/router';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService, NgbModalConfig, NgbModal],
})
export class ProjectsComponent implements OnInit {
  public status: string;
  public project: Project;
  public projects: Array<Project>;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private modalService: NgbModal
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
        console.log(this.projects);
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  edit(editContent: any, idProject: any) {
    this.getProject(idProject);
    this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalService.open(createContent);
  }

  viewVersions(idProject: any): void {
    this._router.navigate(['project/' + idProject + '/versions']);
  }

  getProject(idProject: number) {
    this._projectService.getProject(idProject).subscribe(
      (response) => {
        let proj = response.res;
        this.project = new Project(
          proj.id,
          proj.project_name,
          proj.company,
          proj.state
        );
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  createProject(projectForm: NgForm) {
    if (projectForm.valid) {
      this._projectService.setProject(projectForm.value).subscribe(
        (response) => {
          console.log(response);
          this.getAllProjects();
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    }
  }

  editProject() {
    this._projectService.editProject(this.project).subscribe(
      (response) => {
        let proj = response.res;
        this.project = new Project(
          proj.id,
          proj.project_name,
          proj.company,
          proj.state
        );
        this.getAllProjects();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    ); 
  }

  deleteProject(idProject: any) {
    this._projectService.deleteProject(idProject).subscribe(
      (response) => {
        let proj = response.res;
        this.project = new Project(
          proj.id,
          proj.project_name,
          proj.company,
          proj.state
        );
        this.getAllProjects();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
