import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router, RouterFeature } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  
})
export class RegisterPage implements OnInit {
  usuario: FormGroup;
  
  constructor(public http: HttpClient, private router: Router,private auth:AuthService,private alertCtrl:AlertController ,private platform: Platform,private fb: FormBuilder) {
    
    this.usuario= this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signin() {
    this.auth.registerUser(this.usuario.value.email, this.usuario.value.password)
      .then(result => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.alertCtrl.create({
          header: 'Error',
          subHeader: err.message,
          buttons: ['Aceptar']
        }).then(alert => {
          alert.present();
        });
      });
  }
  
  ngOnInit() {
  }


  aceptarTerminos(event: Event) {
    event.stopPropagation();

  }
  mostrarTerminos() {
    this.router.navigateByUrl('/terms');
  }
}