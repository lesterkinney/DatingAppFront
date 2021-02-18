import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  url = environment.apiUrl + 'appusers/';
  members: Member[] = [];


  constructor(private http: HttpClient) { 
  }

  getMembers() {
    if(this.members.length > 0) {
      return of(this.members);
    }

    return this.http.get<Member[]>(this.url).pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.url + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.url, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.url + 'set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.url + 'delete-photo/' + photoId);
  }
}
