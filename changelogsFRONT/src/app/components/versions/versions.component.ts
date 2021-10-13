import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
import {ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css'],
  providers: [VersionService]
})
export class VersionsComponent implements OnInit {

  public status: string;
  public versions: Array<Version>;

  constructor(
    private _versionService: VersionService,
    private _route:ActivatedRoute,
    private _router: Router
  ) {
    this.status =  '';
    this.versions = [];
   }

  ngOnInit(): void {

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

  viewVersions(idProject: any, idVersion: any): void{
    this._router.navigate(['project/'+idProject+'/version/'+idVersion+"/versionsChanges"]);
  }

}


