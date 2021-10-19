import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VersionChangesService } from 'src/app/services/versionChanges.service';
import { VersionChanges } from '../../models/version_changes';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-versions-changes',
  templateUrl: './versions-changes.component.html',
  styleUrls: ['./versions-changes.component.css'],
  providers: [VersionChangesService, VersionService, ProjectService]
})
export class VersionsChangesComponent implements OnInit, DoCheck {

  public status: string;
  public versionsChanges: Array<VersionChanges>;
  public versionChanges: VersionChanges;
  public version: Version;
  public project: Project;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  public identity: any;
  public token: any;
  public idProject: string;

  public modalReference: any;
  public date = Date;

  constructor(
    private _userService: UserService,
    private _versionChangesService: VersionChangesService,
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.status = '';
    this.versionsChanges = [];
    this.versionChanges = new VersionChanges('', '', '', '', '');
    let date = new Date();
    this.version = new Version(0, '', '', '', '', date, 0, '');
    this.project = new Project('', '', '', 0);

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.idProject = this._route.snapshot.params['idProject'];
  }

  ngOnInit(): void {

    if (!this.identity || !this.token) {
      this._router.navigate(['/login']);
    }

    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];

    this.getAllVersionsChanges();
    this.getVersion(idVersion);
    this.getProject(idProject);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  getAllVersionsChanges() {
    this.versionsChanges = [];
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];

    this._versionChangesService.getVersionsChanges(idProject, idVersion).subscribe(
      (response) => {
        for (let vers of response.res) {
          let tempVersion = new VersionChanges(vers.id, vers.version_id, vers.change_name, vers.description_html, vers.description_long);
          this.versionsChanges.push(tempVersion);
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      });
  }

  getVersionChanges(idVersionChanges: number) {
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];
    this._versionChangesService.getVersionChanges(idProject, idVersion, idVersionChanges).subscribe(
      (response) => {
        let versChangs = response.res;
        this.versionChanges = new VersionChanges(
          versChangs.id,
          versChangs.version_id,
          versChangs.change_name,
          versChangs.description_html,
          versChangs.description_long,
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

  edit(editContent: any, idVersionChanges: any) {
    this.getVersionChanges(idVersionChanges);
    this.modalReference = this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalReference = this.modalService.open(createContent);
  }

  createVersionChanges(idProject: string, idVersion: number, projectForm: NgForm) {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Vas a crear un nuevo cambio en la versión!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'CREAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

        if (projectForm.valid) {
          this._versionChangesService.setVersionChanges(idProject, idVersion, projectForm.value).subscribe(
            (response) => {
              Swal.fire({
                text: "El cambio de la versión " + response.res.change_name + " se creo exitosamente!",
                confirmButtonColor: '#93B7BE',
                icon: 'success',
              });
              this.modalReference.close();
              this.getAllVersionsChanges();
            },
            (error) => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          Swal.fire({
            text: "Algunos o algunos de los campos esta mal rellenos!",
            confirmButtonColor: '#93B7BE',
            icon: 'error',
          });
        }
      }
    });
  }

  editVersionChanges() {
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];

    Swal.fire({
      title: 'Estas seguro?',
      text: "Vas a editar el cambio de la versión!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'EDITAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {

        this._versionChangesService.editVersionChanges(idProject, idVersion, this.versionChanges).subscribe(
          (response) => {
            let versChange = response.res;
            this.versionChanges = new VersionChanges(
              versChange.id,
              versChange.version_id,
              versChange.change_name,
              versChange.description_html,
              versChange.description_long
            );
            this.modalReference.close();
            Swal.fire({
              text: "El cambio de la versión " + versChange.change_name + " se edito exitosamente!",
              confirmButtonColor: '#93B7BE',
              icon: 'success',
            });
            this.getAllVersionsChanges();
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );

      }
    });
  }


  deleteVersionChanges(idProject: any, idVersion: any, idVersionChanges: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Eliminarás este cambio de la versión!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#93B7BE',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'ELIMINAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        this._versionChangesService.deleteVersionChanges(idProject, idVersion, idVersionChanges).subscribe(
          (response) => {
            let proj = response.res;
            this.project = new Project(
              proj.id,
              proj.project_name,
              proj.company,
              proj.state
            );
            Swal.fire({
              text: "El cambio de la versión se eliminó!",
              confirmButtonColor: '#93B7BE',
              icon: 'success',
            });
            this.getAllVersionsChanges();
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );
      }
    });
  }

  goBack() {
    this._router.navigate(['project/' + this.idProject + '/versions']);
  }

}
