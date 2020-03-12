import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})
export class UserLoggedComponent implements OnInit {

  formLogin: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private userservice: UsersService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {

  }

  private buildForm() {
    this.formLogin = this.formbuilder.group({
      nomb_user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onLogin(event: Event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      const value = this.formLogin.value;
      console.log(value);
      this.userservice.loginIn(value)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/map']);
          }
        );

    } else {
      this.formLogin.markAllAsTouched();
    }
    //console.log(this.formLogin.value);

    this.formLogin.reset();
  }
}
