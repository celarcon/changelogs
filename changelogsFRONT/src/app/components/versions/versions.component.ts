import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/services/version.service';
import { Version } from '../../models/version';
@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css'],
  providers: [VersionService]
})
export class VersionsComponent implements OnInit {

  public status: string;
  public version: Array<Version>;

  constructor(
    private _versionService: VersionService
  ) {
    this.status =  '';
    this.version = [];
   }

  ngOnInit(): void {

    this._versionService.getVersions().subscribe(
      (response) => {
          console.log(response.res);
          for(let vers of response.res){
            let tempVersion = new Version('','','','','','','',0,''); 
            this.version.push(tempVersion); 
          }
          console.log(this.version);
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      });
  }

}


