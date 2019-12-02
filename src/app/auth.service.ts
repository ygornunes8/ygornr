import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthService {

    private API_URL = 'https://certify-me.herokuapp.com/';
    key: string;
    data = {
        email: '',
        password: ''
    };

    constructor(public router: Router,
                public http: HttpClient,
                private storage: Storage
    ) {
    }

    logar() {
        return new Promise((resolve, reject) => {

            this.http.post(this.API_URL + 'sessions', this.data)
                .subscribe((result: any) => {
                    resolve(result);
                    this.storage.set('token', result.token);
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

    logoutUser() {
        localStorage.removeItem('token');
        this.router.navigate(['/events']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }
}
