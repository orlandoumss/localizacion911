import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapgeoService } from 'src/app/services/mapgeo.service';
import { debounceTime } from 'rxjs/operators';
import { GeoLocalService } from 'src/app/services/geo-local.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-searchgeo',
  templateUrl: './searchgeo.component.html',
  styleUrls: ['./searchgeo.component.css']
})
export class SearchgeoComponent implements OnInit {

  searchGeo = new FormControl();
  datosGeo: string[] ;
  filterLocalizacion: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  datosLoc: any[];
  constructor(
        private mapgeoservice: MapgeoService,
        private geoService: GeoLocalService
        ) { }

  ngOnInit() {
    this.geoService.getGeo().subscribe(
      res => {
        this.datosLoc = res;

        // for(let local of this.datosLoc) {
        //     this.datosGeo.push(local.razon_social);
        // }
        console.log('datos obtenidos busqueda... ', this.datosLoc);
        this.filterLocalizacion = this.searchGeo.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },
      err => console.log(err)
    );

    this.searchGeo.valueChanges
      .pipe(
        debounceTime(300)
      );
     this.searchGeo.valueChanges.subscribe( value => this.searchEmitter.emit(value));

  }

  @Output ('searchGeo') searchEmitter = new EventEmitter< string >();

  private _filter(value: string): string[] {
    var nombLoc = new Array();
    var length;
    for(let local of this.datosLoc) {
           length = nombLoc.push(local.razon_social);
     }
    this.datosGeo = nombLoc;
    const filterValue = value.toLowerCase();
    console.log('datos obtenidos busqueda 1... ', this.datosGeo);
    return this.datosGeo.filter(dato => dato.toLowerCase().includes(filterValue));
  }

  localizarPunto = (event: any) => {
    event.preventDefault();

    if (event.target.value ) {
      this.mapgeoservice.busqueda$.emit(event.target.value);
      console.log ( "valor enter: ", event.target.value);
    }
    if ( this.searchGeo.valid ) {
      this.mapgeoservice.busqueda$.emit(this.searchGeo.value);
      console.log ( "valor click: ", this.searchGeo.value);
    }
  }
}
