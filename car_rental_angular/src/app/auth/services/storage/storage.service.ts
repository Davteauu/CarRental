import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (this.isBrowser()) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (this.isBrowser()) {
      const user = window.localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role ?? "";
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return !!token && role === "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return !!token && role === "CUSTOMER";
  }

  static logout(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}

