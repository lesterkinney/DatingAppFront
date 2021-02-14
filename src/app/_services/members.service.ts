import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  url = environment.apiUrl + 'appusers/';
  matches: any;

  constructor(private http: HttpClient) { 
  }

  getMembers() {
    this.matches = this.http.get<Member[]>(this.url);
    return this.matches;
  }

  getMember(username: string){
    return this.http.get<Member>(this.url + username);
  }
}
