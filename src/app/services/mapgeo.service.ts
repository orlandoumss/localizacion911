import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MapgeoService {

  localizacion$ = new EventEmitter<object>();
  busqueda$ = new EventEmitter<string>();

  constructor() { }
}
