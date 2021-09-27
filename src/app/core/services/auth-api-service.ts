import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse, RegisterResponse} from "../interfaces/interfaces";


@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public createUserURL: string = 'http://localhost:3000/create_user';
  public logInUserURL: string = 'http://localhost:3000/login';
  public addGroupURL: string = 'http://localhost:3000/add-group';
  public searchGroupURL: string = 'http://localhost:3000/group-check';
  public usersInGroupURL: string = 'http://localhost:3000/group-users';
  public addExpenseURL: string = 'http://localhost:3000/add-expense';

  public register(email: string, name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.createUserURL, {
      name, email, password
    });
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.logInUserURL, {
      email, password
    });
  }

  public createGroup(name: string, usersEmails: string[]): Observable<any> {
    return this.http.post(this.addGroupURL, {
      name, usersEmails
    });
  }

  public searchGroup(userId: string): Observable<any> {
    return this.http.post(this.searchGroupURL, {
      userId
    });
  }

  public usersInGroup(name: string): Observable<any> {
    return this.http.post(this.usersInGroupURL, {
      name
    })
  }

  public singleExpenseAdd(from: string[], to: string,
                          amount: number[], currencyMultiplier: Number,
                          description: string): Observable<any> {
    return this.http.post(this.addExpenseURL, {
      from, to, amount, currencyMultiplier, description
    })
  }

}
