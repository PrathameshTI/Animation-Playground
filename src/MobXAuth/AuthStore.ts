// AuthStore.ts
import { action, makeObservable, observable } from 'mobx';

class AuthStore {
  isAuthenticated: boolean = false;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      login: action,
      logout: action,
    });
  }

  login(username: string, password: string) {
    // Simulate authentication logic
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logout() {
    this.isAuthenticated = false;
  }
}

export const authStore = new AuthStore();
