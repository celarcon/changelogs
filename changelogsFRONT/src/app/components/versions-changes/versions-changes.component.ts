import { Component, OnInit } from '@angular/core';
import { VersionChangesService } from 'src/app/services/versionChanges.service';
import { VersionChanges } from '../../models/version_changes';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-versions-changes',
  templateUrl: './versions-changes.component.html',
  styleUrls: ['./versions-changes.component.css'],
  providers: [VersionChangesService]
})
export class VersionsChangesComponent implements OnInit {

  public status: string;
  public versionsChanges: Array<VersionChanges>;

  constructor(
    private _versionChangesService: VersionChangesService,
    private _route: ActivatedRoute
  ) { 
    this.status =  '';
    this.versionsChanges = [];
  }

  ngOnInit(): void {

    let idProject = this._route.snapshot.params['idProject'];
    let idVersion = this._route.snapshot.params['idVersion'];

    this._versionChangesService.getVersionsChanges(idProject, idVersion).subscribe(
      (response) => {
          for(let vers of response.res){
            let tempVersion = new VersionChanges(vers.id, vers.project_id, vers.version_name, vers.description, vers.description_html); 
            this.versionsChanges.push(tempVersion); 
          }

          console.log(this.versionsChanges);
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      });
  }

}
