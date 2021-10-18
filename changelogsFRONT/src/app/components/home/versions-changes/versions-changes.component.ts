import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VersionChangesService } from 'src/app/services/versionChanges.service';
import { VersionChanges } from '../../../models/version_changes';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../../models/version';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../../models/project';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-versions-changes',
  templateUrl: './versions-changes.component.html',
  styleUrls: ['./versions-changes.component.css'],
  providers: [VersionChangesService, VersionService, ProjectService]
})
export class VersionsChangesPublicComponent implements OnInit {

  public status: string;
  public versionsChanges: Array<VersionChanges>;
  public versionChanges: VersionChanges;
  public version: Version;
  public project: Project;
  public idProject: number;
  public idVersion: number;

  constructor(
    private _userService: UserService,
    private _versionChangesService: VersionChangesService,
    private _versionService: VersionService,
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.status = '';
    this.idProject = 0;
    this.idVersion = 0;
    this.versionsChanges = [];
    this.versionChanges = new VersionChanges('', '', '', '', '');
    let date = new Date();
    this.version = new Version('', '', '', '', '', date, 0, '');
    this.project = new Project('', '', '', 0);
  }

  ngOnInit(): void {

    this.idVersion = this._route.snapshot.params['idVersion'];
    this.idProject = this._route.snapshot.params['idProject'];

    this.getAllVersionsChanges();
    this.getVersion();
    this.getProject();

  }

  getAllVersionsChanges() {
    this.versionsChanges = [];

    this._versionChangesService.getVersionsChanges(this.idProject, this.idVersion).subscribe(
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
    this._versionChangesService.getVersionChanges(this.idProject, this.idVersion, idVersionChanges).subscribe(
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

  getVersion() {

    this._versionService.getVersion(this.idProject, this.idVersion).subscribe(
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

  getProject() {
    this._projectService.getProject(this.idProject).subscribe(
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

  goBack() {
    this._router.navigate(['versions/'+this.idProject]);
  }
}
