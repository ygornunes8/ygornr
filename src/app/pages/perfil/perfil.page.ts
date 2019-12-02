import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { User } from '../Models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private formulario: FormGroup;

  user: User[] = [];

  private API_URL = 'https://certify-me.herokuapp.com/';

  key: string;

  data = {
    id: '',
    name: '',
    cpf: ''
  };


  constructor(public router: Router,
              public http: HttpClient,
              private storage: Storage,
              public alert: AlertController,
              private formBuilder: FormBuilder
      ) {
        this.formulario = this.formBuilder.group({
          cpf: ['', Validators.required],
        });
}

  async ngOnInit() {
    this.user = [];
    this.key = await this.storage.get('token');
    this.verPerfil();
    console.log(this.key);
  }

  verPerfil() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.key
    });
    let params = new HttpParams();
    params = params.append('=', this.data.name);
    return new Promise((resolve, reject) => {
      /*
      const headers = new Headers();
      const options = new RequestOptions({headers});
      headers.append('Authorization', btoa('token') ); // isso ta errado vc precisa passar o Beare
      headers.append('Content-Type', 'aplication/json');
      */
      const url = this.API_URL + 'users/';
      return this.http.get(url, {headers, params})// aqui vc tinha colocado como post mas é get
      .subscribe ((result: any) => {
        resolve(result);
        // é aqui.... no site que tu tinha visto, tava assim.....
        this.user = result;
        },
        (error) => {
          reject(error);
        });
    });
  }

  salvarPerfil() {
    this.showAlert('Atualizado!', 'Perfil atualizado com sucesso!');
    this.router.navigate(['/home']);
  }

  /*async salvarPerfil(user: any) {
    return new Promise ((resolve, reject) => {

      const url = this.API_URL + 'users';
      const data = {
        cpf: user.cpf,
        registration: user.registration,
        oldPassword: user.oldPassword,
        password: user.password,
        passwordConfirm: user.passwordConfirm
      };

      this.http.put(url, data)
      .subscribe ((result: any) => {
        resolve(result.json);
        this.showAlert('Atualizado!', 'Perfil atualizado com sucesso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        reject(error);
        this.showAlert('Ops!', 'Preencha todos os campos!');
      });
    });
  }*/

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }


  logout() {
    this.router.navigate(['/login']);
  }
}
