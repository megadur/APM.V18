import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /** The line `keycloakStatus: string | undefined;` in the `HeadComponent` class is declaring a public
  property `keycloakStatus` with a type annotation in TypeScript. */
  keycloakStatus: string | undefined;
  /** The line `public username = "";` in the `HeadComponent` class is declaring a public property
  `username` and initializing it with an empty string value `""`. This property is used to store the
  username of the user once it is retrieved from the Keycloak service. */
  public username = 'Dr. Mustermann';
  /** The line `authenticated = false;` in the `HeadComponent` class is initializing a public property
  `authenticated` with a default value of `false`. This property is used to track the authentication
  status of the user in the component. When the component is initialized, the `authenticated`
  property is set to `false`, indicating that the user is not authenticated by default. This
  property is then updated based on the user's authentication status when interacting with the
  component, such as when the `onButtonClick` function is called to toggle the authentication status
  using Keycloak. */
  authenticated = sessionStorage.getItem('loggedIn') === 'true' ? true : false;
  statusText = sessionStorage.getItem('statusText')
    ? sessionStorage.getItem('statusText')
    : '';

  constructor(private router: Router) {}

  /**
   * The function checks if the user is logged in with Keycloak, loads the user profile, and retrieves
   * the username if logged in.
   */
  // ngOnInit(): void {
  //   // if (this.keycloak.isLoggedIn()) {
  //   //   this.keycloak.loadUserProfile();
  //   //   this.username = this.keycloak.getUsername();
  //   // }
  // }

  // simulates login
  onButtonClickWelcome() {
    if (!this.authenticated) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');
      this.router.navigate(['/welcome']);
    } else {
      sessionStorage.setItem('loggedIn', 'false');
      sessionStorage.setItem('statusText', '');
      this.router.navigate(['/']);
    }
    this.authenticated =
      sessionStorage.getItem('loggedIn') === 'true' ? true : false;
    this.statusText = sessionStorage.getItem('statusText')
      ? sessionStorage.getItem('statusText')
      : '';
  }
}
