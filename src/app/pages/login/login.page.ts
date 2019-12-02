import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  isLoading = false;

  private API_URL = 'https://certify-me.herokuapp.com/';
  key: string;
  data = {
    email: '',
    password: '',
  };

  data2 = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };


  constructor(public router: Router,
              public http: HttpClient,
              private storage: Storage,
              public alert: AlertController
    ) {
    }

  async ngOnInit() {
    this.key = await this.storage.get('token');
    console.log(this.key);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async cadastrar() {
    return new Promise ((resolve, reject) => {
      this.http.post(this.API_URL + 'users', this.data2)
      .subscribe ((result: any) => {
        resolve(result.json);
        this.showAlert('Bem vindo!', 'Seja bem vindo ao Chronos!');
        this.router.navigate(['/perfil']);
        this.showAlert('Atenção', 'Atualize seu perfil!');
      },
      (error) => {
        if (this.data2.password !== this.data2.passwordConfirm) {
          this.showAlert('Ops!', 'Senhas diferentes!');
        } else {
          reject(error);
          this.showAlert('Ops!', 'Dados inválidos ou senhas diferenes!');
        }
      });
    });
  }

  async logar() {
    return new Promise ((resolve, reject) => {
      this.http.post(this.API_URL + 'sessions', this.data)
      .subscribe (async (result: any) => {
        resolve(result);
        this.storage.set('token', result.token);
        this.storage.set('usuario', result.user);
        this.storage.get('usuario').then(user => {
          this.showAlert('Bem vindo! ' + user.name, 'Seja bem vindo ao Chronos!');
          this.router.navigate(['/home']);
        });
      },
        (error) => {
          reject(error);
          this.showAlert('Ops!', 'Usuário ou senha inválidos');
        });
    });
  }

  loading = () => {
    this.isLoading = true;
  }

}
