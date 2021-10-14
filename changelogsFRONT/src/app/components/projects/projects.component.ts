import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { Router } from '@angular/router';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService, NgbModalConfig, NgbModal],
})
export class ProjectsComponent implements OnInit, DoCheck {
  public status: string;
  public project: Project;
  public projects: Array<Project>;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  public identity: any;
  public token: any;

  public modalReference: any;

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.status = '';
    this.projects = [];
    this.project = new Project('', '', '', 0);

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    if (!this.identity || !this.token) {
      this._router.navigate(['/login']);
    }

    this.getAllProjects();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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

  edit(editContent: any, idProject: any) {
    this.getProject(idProject);
    this.modalReference = this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalReference = this.modalService.open(createContent);
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

    Swal.fire({
      title: 'Estas seguro?',
      text: "Vas a crear un nuevo proyecto!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'CREAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

        if (projectForm.valid) {
          this._projectService.setProject(projectForm.value).subscribe(
            (response) => {
              Swal.fire({
                text: "El proyecto " + response.res.project_name + " se creo exitosamente!",
                confirmButtonColor: '#93B7BE',
                icon: 'success',
              });
              this.modalReference.close();
              this.getAllProjects();
            },
            (error) => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          Swal.fire({
            text: "Algunoo algunos de los campos esta mal rellenos!",
            confirmButtonColor: '#93B7BE',
            icon: 'error',
          });
        }
      }
    });
  }

  editProject() {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Vas a editar el proyecto!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'EDITAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

        this._projectService.editProject(this.project).subscribe(
          (response) => {
            let proj = response.res;
            this.project = new Project(
              proj.id,
              proj.project_name,
              proj.company,
              proj.state
            );
            this.modalReference.close();
            Swal.fire({
              text: "El proyecto " + response.res.project_name + " se edito exitosamente!",
              confirmButtonColor: '#93B7BE',
              icon: 'success',
            });
            this.getAllProjects();
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );

      }
    });
  }

  deleteProject(idProject: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Eliminarás este proyecto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'ELIMINAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

        this._projectService.deleteProject(idProject).subscribe(
          (response) => {
            let proj = response.res;
            this.project = new Project(
              proj.id,
              proj.project_name,
              proj.company,
              proj.state
            );
            Swal.fire({
              text: "El proyecto se eliminó!",
              confirmButtonColor: '#93B7BE',
              icon: 'success',
            });
            this.getAllProjects();
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );

      }
    });
  }
}
