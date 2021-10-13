import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
import {ActivatedRoute , Router} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project';
import { faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css'],
  providers: [VersionService, ProjectService] 
})
export class VersionsComponent implements OnInit {

  public status: string;
  public versions: Array<Version>;
  public version: Version;
  public project: Project;

  public faTrash = faTrashAlt;
  public faPen = faPen;
  public faTimes = faTimes;

  constructor(
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route:ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.status =  '';
    this.versions = [];
    this.version = new Version('','','','','','',0,'');
    this.project = new Project('', '', '', 0);
   }

  ngOnInit(): void {
    let idProject = this._route.snapshot.params['idProject'];
    this.getAllVersions();
    this.getProject(idProject);
  }

  getAllVersions(){
    let idProject = this._route.snapshot.params['idProject'];
    this._versionService.getVersions(idProject).subscribe(
      (response) => {
          for(let vers of response.res){
            let tempVersion = new Version(vers.id, vers.project_id, vers.version_name, vers.description, vers.description_html,vers.version_date,vers.state.data[0],vers.publisher); 
            this.versions.push(tempVersion); 
          }

          console.log(this.versions);
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
          vers.project_name,
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

  viewVersions(idProject: any, idVersion: any): void{
    this._router.navigate(['project/'+idProject+'/version/'+idVersion+"/versionsChanges"]);
  }

  edit(editContent: any, idProject: any) {
    this.getProject(idProject);
    this.modalService.open(editContent);
  }

  create(createContent: any) {
    this.modalService.open(createContent);
  }

  createProject(projectForm: NgForm) {
    if (projectForm.valid) {
      this._projectService.setProject(projectForm.value).subscribe(
        (response) => {
          console.log(response);
          this.getAllVersions();
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
        this.getAllVersions();
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
        this.getAllVersions();
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}


