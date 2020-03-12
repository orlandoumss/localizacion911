import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { GeoLocalService } from '../../../services/geo-local.service';

import * as Mapboxgl from 'mapbox-gl';
//import { element } from 'protractor';
//import { type } from 'os';
//import { async } from '@angular/core/testing';
import { MapgeoService } from 'src/app/services/mapgeo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

/* ***************************** */
  tipo_geo: {grup_loc: string, opcion: number};
  options: FormGroup;
  colorControl = new FormControl('accent');
  fontSizeControl = new FormControl('', Validators.min(10));

  datosGeo: any[] ; // any;
  datosItem = []; // : any;
  /*  constructor de la clase *************************/
  constructor(
      fb: FormBuilder,
      private geoService: GeoLocalService,
      private mapgeoservice: MapgeoService
    ) {
        this.options = fb.group({
          color: this.colorControl,
          fontSize: this.fontSizeControl
        });

  } // fin del constructor ************************

/* **************************************************************************************
    Función para ejecutar la asignacion de puntos de georeferenciación de puntos segun el
    grupo seleccionado...
**************************************************************************************** */
enviarParametros(nomb_grup: string, opcion: number){
  this.tipo_geo = {grup_loc: nomb_grup, opcion: opcion};
  //this.tipo_geo.opcion = opcion;
  //console.log('verificando ---> ', this.tipo_geo.grup_loc);
  this.mapgeoservice.localizacion$.emit(this.tipo_geo);
}

/* **************************************************************************************

**************************************************************************************** */

  getFontSize() {
    return Math.max(14, this.fontSizeControl.value);
  }

  ngOnInit() {
    this.geoService.getItem()
        .subscribe(
          res => {
            this.datosItem =  res;
            //console.log('datos obtenidos uno... ' + this.datosItem);
          },
            err => console.log(err)
      );

    this.mapgeoservice.busqueda$.subscribe(texto => {
      console.log(texto);
    });

    this.geoService.getGeo().subscribe(
      res => {
        this.datosGeo = res;
        //console.log('datos obtenidos busqueda... ', this.datosGeo);
      },
      err => console.log(err)
    );

  } // ********************************fin OnInit

  handleSearch(value: string) {
    console.log(value);
  }
}
