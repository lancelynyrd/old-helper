import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserXbase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserXbase {

  //private url: string = "wwww.work.org/xbase/index.php";

  constructor(public http: Http) {
    console.log('Hello UserXbase Provider');
  }



}
