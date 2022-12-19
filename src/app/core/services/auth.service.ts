import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponseModel } from '../models/loginResponseModel';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginRequestModel } from '../models/loginRequestModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  controllerUrl = `${environment.apiUrl}/auth`;

  constructor(
    private httpClient: HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.controllerUrl + '/login',
      request
    );
    // Token için post işlemi ile http çağrısı
  }

  logout(){
    this.localStorageService.remove("token")
  }

  get isAuthenticated(): boolean {
    let token = this.localStorageService.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }
}
