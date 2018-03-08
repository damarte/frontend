import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatementsService extends BaseService {

  //TODO ADD HEADERS in CALLS
  // , {headers: this.headers}

  constructor(public http: HttpClient) {
    super(http);
   }

  // GET UserStatements
  public getUserStatements(userName):any {
    return this.http.get(`${this.urlBaseStatements}/${userName}`);
  }

  // DELETE UserStatements
  public deleteUserStatements(statement:any){
    return this.http.delete(`${this.urlBaseStatements}/${statement}`);
  }

  // POST USERS
  public postUserStatement(statement:any){
    return this.http.post(`${this.urlBaseStatements}${this.endPointAdvanced}${this.endPointStatementAdd}`, statement);
  }

}
