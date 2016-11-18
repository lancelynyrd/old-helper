import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostXbase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostXbase {

  public serverUrl: string = "http://www.work.org/xbase/index.php";

  constructor(public http: Http,
              private alertCtrl: AlertController) {
    console.log('Hello PostXbase Provider');
  }

  create( successCallback ,  failureCallback ) {

  }


  get( url: string, successCallback, failureCallback? ) {
    return this.http.get( url )
        .map( e => {
          return this.json(e['_body']);
        } )
        .catch( ( e ) => {
          failureCallback( e );
          return this.errorHandler( e );
        } )
        .subscribe( (res) => {
          console.log(res);
          successCallback(res);
        } );
  }

  gets( arg, successCallback ,  failureCallback ) {
    let params = Object.keys( arg )
        .map( k => {
          if(( arg[k]) && typeof arg[k] === 'object'){
            let subparams = Object.keys( arg[k] )
                .map( sk => {
                  return k+'['+sk+']'+ '=' + arg[k][sk];
                })
                .join( '&' );
            return subparams;
          }
          else {
            console.log( k + '=' + arg[k]);
            return k + '=' + arg[k]
          }
        })
        .join( '&' );
    console.log(params);
    let url = this.serverUrl + '?' + params;
    console.log(url);
    return this.get( url, successCallback, failureCallback );
  }

  json( e ) {
    let res;
    if ( ! e ) {
      this.error("Xbase::Json() - Server returns empty data");
      return e;
    }
    try {
      res = JSON.parse( e );
    }
    catch (e) {
      this.error("Xbase::Json() - Failed to parse JSON data.");
      console.log(e);
    }
    return res;
  }

  error( message: string, e?: any ) {
    let error_message = '';
    if ( e && e.message ) error_message = e.message + ' - ';
    this.alert( 'ERROR', error_message + message );
  }

  alert( title: string, content: string ) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  errorHandler( err: any ) {
    let errMsg = (err.message) ?
        err.message :
        err.status ? `${err.status} - ${err.statusText}` : 'Server error. Please check if backend server is alive and there is no error.';
    this.error(errMsg);
    return Observable.throw(errMsg);
  }

}
