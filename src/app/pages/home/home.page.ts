import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { Certificados } from './../Models/Certificados';
import { AuthService } from './../../auth.service';
import { async } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, Platform } from '@ionic/angular';
import { Cursos } from '../Models/Cursos';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  certificados: Certificados[] = [];
  cursos: Cursos[] = [];

  private API_URL = 'https://certify-me.herokuapp.com/';
  key: string;
  data = {
    id: '',
    name: '',
    url: ''
  };
  nav: any;

  constructor(public router: Router,
              public http: HttpClient,
              private storage: Storage,
              public alert: AlertController
                ) {
  }

  async ngOnInit() {
    this.certificados = [];
    this.cursos = [];
    this.key = await this.storage.get('token');
    this.listarCertificados();
    console.log(this.key);
  }

  listarCertificados() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.key
    });
    let params = new HttpParams();
    params = params.append('=', this.data.id);
    // aqwui em cima organizei melhor o header e params
    return new Promise((resolve, reject) => {
      /*
      const headers = new Headers();
      const options = new RequestOptions({headers});
      headers.append('Authorization', btoa('token') ); // isso ta errado vc precisa passar o Beare
      headers.append('Content-Type', 'aplication/json');
      */
      const url = this.API_URL + 'files/';
      return this.http.get(url, {headers, params})// aqui vc tinha colocado como post mas é get
      .subscribe ((result: any) => {
        resolve(result);
        this.certificados = result;
        this.cursos = result;
        },
        (error) => {
          reject(error);
        });
    });
  }

  async novoCertificado() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.key
    });
    let params = new HttpParams();
    params = params.append('=', this.data.id);
    this.router.navigate(['/certificado']);
    // aqwui em cima organizei melhor o header e params
    return new Promise((resolve, reject) => {
      /*
      const headers = new Headers();
      const options = new RequestOptions({headers});
      headers.append('Authorization', btoa('token') ); // isso ta errado vc precisa passar o Beare
      headers.append('Content-Type', 'aplication/json');
      */
      const url = this.API_URL + 'files/';
      return this.http.get(url, {headers, params})// aqui vc tinha colocado como post mas é get
      .subscribe ((result: any) => {
        resolve(result.json);
        },
        (error) => {
          reject(error);
        });
    });
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.key
    });
    let params = new HttpParams();
    params = params.append('=', this.data.id);
    this.router.navigate(['/certificado']);
    return new Promise((resolve, reject) => {

      const url = this.API_URL + 'files/';
      return this.http.post(this.API_URL + 'users', this.data.name)// aqui vc tinha colocado como post mas é get
      .subscribe ((result: any) => {
        resolve(result.json);
        },
        (error) => {
          reject(error);
        });
    });
  }*/
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
