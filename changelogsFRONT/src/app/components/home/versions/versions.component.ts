import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css']
})
export class VersionsPublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Hola version publica");
  }

}
