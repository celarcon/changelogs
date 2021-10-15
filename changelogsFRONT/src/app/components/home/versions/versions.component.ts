import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../../models/version';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css'],
  providers: [VersionService, ProjectService],
}) 

export class VersionsPublicComponent implements OnInit {

  public status: string;
  public versions: Array<Version>;
  public version: Version;
  public project: Project;

  public identity: any;
  public token: any;

  public modalReference: any;

  constructor(
    private _userService: UserService,
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.status = '';
    this.versions = [];
    this.version = new Version('', '', '', '', '', '', 0, '');
    this.project = new Project('', '', '', 0);

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    let idProject = this._route.snapshot.params['idProject'];
    this.getAllVersions();
    this.getProject(idProject);
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

  viewChangeVersions(idVersion: any, idProject: any): void {
    this._router.navigate(['versionsChanges/'+idVersion+'/project/'+idProject]);
  }

  goBack() {
    this._router.navigate(['home']);
  }

}
