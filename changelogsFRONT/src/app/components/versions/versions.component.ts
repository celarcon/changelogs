import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css'],
  providers: [VersionService, ProjectService]
})
export class VersionsComponent implements OnInit, DoCheck {

  public status: string;
  public versions: Array<Version>;
  public version: Version;
  public project: Project;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.status = '';
    this.versions = [];
    this.version = new Version('', '', '', '', '', '', 0, '');
    this.project = new Project('', '', '', 0);

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    if (!this.identity || !this.token) {
      this._router.navigate(['/login']);
    }

    let idProject = this._route.snapshot.params['idProject'];
    this.getAllVersions();
    this.getProject(idProject);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getAllVersions() {
    this.versions = [];
    let idProject = this._route.snapshot.params['idProject'];
    this._versionService.getVersions(idProject).subscribe(
      (response) => {
        for (let vers of response.res) {
          let tempVersion = new Version(vers.id, vers.project_id, vers.version_name, vers.description, vers.description_html, vers.version_date, vers.state, vers.publisher);
          this.versions.push(tempVersion);
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      });
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

  getVersion(idVersion: number) {
    let idProject = this._route.snapshot.params['idProject'];
    this._versionService.getVersion(idProject, idVersion).subscribe(
      (response) => {
        let vers = response.res;
        this.version = new Version(
          vers.id,
          vers.project_id,
          vers.version_name,
          vers.description,
          vers.description_html,
          vers.version_date,
          vers.state,
          vers.publisher
        );
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  edit(editContent: any, idVersion: any) {
    this.getVersion(idVersion);
    this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalService.open(createContent);
  }

  createVersion(idProject: string, projectForm: NgForm) {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Vas a crear una nueva versión!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'CREAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

    if (projectForm.valid) {
      this._versionService.setVersion(idProject, projectForm.value).subscribe(
        (response) => {
          Swal.fire({
            text: "La versión "+ response.res.version_name +" se creo exitosamente!",
            confirmButtonColor: '#93B7BE',
            icon: 'success',
          });
          this.getAllVersions();
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    }else{
          Swal.fire({
            text: "Algunos o algunos de los campos esta mal rellenos!",
            confirmButtonColor: '#93B7BE',
            icon: 'error',
          });
        }
      }
    });
  }

  editVersion() {
    this._versionService.editVersion(this.version).subscribe(
      (response) => {
        let vers = response.res;
        this.version = new Version(
          vers.id,
          vers.project_id,
          vers.version_name,
          vers.description,
          vers.description_html,
          vers.version_date,
          vers.state,
          vers.publisher
        );
        this.getAllVersions();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  deleteVersion(idProject: any, idVersion: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Eliminarás esta versión!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'ELIMINAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        this._versionService.deleteVersion(idProject, idVersion).subscribe(
          (response) => {
            let proj = response.res;
            this.project = new Project(
              proj.id,
              proj.project_name,
              proj.company,
              proj.state
            );
            Swal.fire({
              text: "La versión se eliminó!",
              confirmButtonColor: '#93B7BE',
              icon: 'success',
            });
            this.getAllVersions();
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );
      }
    });
  }

  viewChangeVersions(idProject: any, idVersion: any): void {
    this._router.navigate(['project/' + idProject + '/version/' + idVersion + "/versionsChanges"]);
  }

  goBack() {
    this._router.navigate(['projects']);
  }

}


