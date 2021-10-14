import { Component, OnInit } from '@angular/core';
import { VersionChangesService } from 'src/app/services/versionChanges.service';
import { VersionChanges } from '../../models/version_changes';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import {ActivatedRoute , Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-versions-changes',
  templateUrl: './versions-changes.component.html',
  styleUrls: ['./versions-changes.component.css'],
  providers: [VersionChangesService,VersionService,ProjectService]
})
export class VersionsChangesComponent implements OnInit {

  public status: string;
  public versionsChanges: Array<VersionChanges>;
  public versionChanges: VersionChanges;
  public version: Version;
  public project: Project;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  constructor(
    private _versionChangesService: VersionChangesService,
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route:ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal
  ) { 
    this.status =  '';
    this.versionsChanges = [];
    this.versionChanges = new VersionChanges('','','','','');
    this.version = new Version('','','','','','',0,'');
    this.project = new Project('', '', '', 0);
  }

  ngOnInit(): void {
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];
    this.getAllVersionsChanges();
    this.getVersion(idVersion);
    this.getProject(idProject);
  }

  getAllVersionsChanges(){
    this.versionsChanges = [];
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];

    this._versionChangesService.getVersionsChanges(idProject, idVersion).subscribe(
      (response) => {
          for(let vers of response.res){
            let tempVersion = new VersionChanges(vers.id, vers.version_id, vers.change_name, vers.description_html, vers.description_long); 
            this.versionsChanges.push(tempVersion); 
          }

          console.log(this.versionsChanges);
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
        console.log(this.versionChanges);
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
        console.log(this.version);
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
    this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalService.open(createContent);
  }

  createVersionChanges(idProject: string,idVersion: string ,projectForm: NgForm) {
    if (projectForm.valid) {
      this._versionChangesService.setVersionChanges(idProject, idVersion, projectForm.value).subscribe(
        (response) => {
          console.log(response);
          this.getAllVersionsChanges();
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    }
  }

  editVersionChanges() {
    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];
    this._versionChangesService.editVersionChanges(idProject, idVersion ,this.versionChanges).subscribe(
      (response) => {
        let versChange = response.res;
        this.versionChanges = new VersionChanges(
          versChange.id,
          versChange.version_id,
          versChange.change_name,
          versChange.description_html,
          versChange.description_long
        );
        this.getAllVersionsChanges();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    ); 
  }

  deleteVersionChanges(idProject: any, idVersion: any, idVersionChanges: any) {
    this._versionChangesService.deleteVersionChanges(idProject, idVersion, idVersionChanges).subscribe(
      (response) => {
        let proj = response.res;
        this.project = new Project(
          proj.id,
          proj.project_name,
          proj.company,
          proj.state
        );
        this.getAllVersionsChanges();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
