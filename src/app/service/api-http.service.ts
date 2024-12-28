import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  protected domain: string = '';
  protected api: string = '';

  constructor(private http: HttpClient) { }

  public get<T>(url: string, options?: any) {
    return this.http.get<T>(this.createUrl(url), options);
  }

  public post<T>(url: string, data: any, options?: any) {
    return this.http.post<T>(this.createUrl(url), data, options);
  }

  public put<T>(url: string, data: any, options?: any) {
    return this.http.put<T>(this.createUrl(url), data, options);
  }

  public delete<T>(url: string, options?: any) {
    return this.http.delete<T>(this.createUrl(url), options);
  }

  createUrl(url: string) {
    return `${this.api}${this.domain}${url}`
  }
}
