import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = environment.apiUrl + 'messages/';

  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize, container){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.url, params, this.http);
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(this.url + 'thread/' + username);
  }

  sendMessage(username: string, content: string){
    return this.http.post<Message>(this.url, {recipientUsername: username, content});
  }

  deleteMessage(id: number){
    return this.http.delete(this.url + id);
  }
}
