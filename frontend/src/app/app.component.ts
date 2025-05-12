import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  helloText: string = 'Hello World';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {} 

  logout(): void {
    this.oauthService.logOut();
    console.log('User logged out');
  }

  getHelloText() {
    this.httpClient.get<{message: string}>('http://localhost:8080/api/hello', 
    { headers: { 'Authorization': `Bearer ${this.oauthService.getAccessToken()}` } })

    // Attention: 
    .subscribe( { next: (result) => {
        this.helloText = result.message;
        console.log('Hello text:', this.helloText);
      }, error: (error) => {
        console.error('Error fetching hello text:', error);
        this.helloText = 'Error fetching hello text';
      }});
  }

}
