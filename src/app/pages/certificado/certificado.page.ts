import { Certificados } from './../Models/Certificados';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.page.html',
  styleUrls: ['./certificado.page.scss'],
})

export class CertificadoPage implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  cert: any;

  certificados: Certificados = new Certificados();

  private API_URL = 'https://certify-me.herokuapp.com/';

  key: string;

  data = {
    id: '',
    name: '',
    url: ''
  };

  dataCert = {
    name: '',
    file: ''
  };


  async ngOnInit() {
    this.key = await this.storage.get('token');
    console.log(this.key);
  }

  constructor(public router: Router,
              public http: HttpClient,
              private storage: Storage,
              public alert: AlertController
  ) {

  }

  upload(str: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + this.key
    });
    const formData = new FormData();

    this.cert = str.target.files[0];

    formData.append('files[]', this.cert);
    formData.append('name', 'Novo Certi');
    console.log(formData, this.cert);
    this.http.post(this.API_URL + 'files', formData, {headers})
    .subscribe((data: any) => {
      console.log(data);
    });
    console.log(str);
  }
}
