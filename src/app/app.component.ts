import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios';

export class Post {
  constructor(
    public title: string,
    public content: string,
    public author: string,
    public id: number
  ) { }
}

export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  posts: Post[] = [];
  formdata!: FormGroup;
  users: User[] = [];


  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.formdata = new FormGroup({
      emailid: new FormControl("angular@gmail.com"),
      passwd: new FormControl("abcd1234")
    });
  }

  registerForm(form: any) {
    var json = JSON.stringify({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });
    var options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46MTU5NzUzZ290NDI='
      },
    }
    this.httpClient.post<any>('http://localhost:8000/register/', json, options).subscribe(
      response => {
        console.log(response);
        this.users = response;
       
        if (window.confirm('Usuário cadastrado com sucesso!')) {
          form.reset();
          window.location.reload();
        }
      }
    );
  }


  getPosts() {
    this.httpClient.get<any>('http://localhost:8000/posts/').subscribe(
      response => {
        response.results.forEach((post: any) => {
          post = new Post(
            post.title,
            post.content,
            post.author,
            post.id
          );
          this.posts.push(post);
        });
      }
    );
  }

  submitForm(form: any) {
    var json = JSON.stringify({
      title: form.value.titulo,
      content: form.value.content,
      author: form.value.author
    });
    var options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46MTU5NzUzZ290NDI='
      },
    }
    this.httpClient.post<any>('http://localhost:8000/posts/', json, options).subscribe(
      response => {
        console.log(response);
        this.posts = response;
       
        if (window.confirm('Seu post enviado foi enviado!')) {
          form.reset();
          window.location.reload();
        }
      }
    );
  }

  submitFormPut(form: any) {
    var json = JSON.stringify({
      title: form.value.titulo,
      content: form.value.content,
      author: form.value.author
    });
    var options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46MTU5NzUzZ290NDI='
      },
    }
    this.httpClient.put<any>(`http://localhost:8000/posts/${form.value.id}/`, json, options).subscribe(
      response => {
        console.log(response);
        this.posts = response;
        if (window.confirm('Seu post foi alterado com sucesso!')) {
          form.reset();
          window.location.reload();
        }
      }
    );
  }

  submitFormDelete(form: any) {
    var options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46MTU5NzUzZ290NDI='
      },
    }
    this.httpClient.delete<any>(`http://localhost:8000/posts/${form.value.id}/`, options).subscribe(
      response => {
        console.log(response);
        this.posts = response;
        if (window.confirm('Seu post foi deletado com sucesso!')) {
          form.reset();
          window.location.reload();
        }
      }
    );
  }

  title = 'Front-End-Api';
  descricao = 'Seja bem vindo!...';

}