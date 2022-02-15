import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddExpenseResponse,
  AddGroupResponse,
  BalanceCheckResponse,
  ExpensesInfo,
  LoginResponse,
  RegisterResponse,
  SettleUpInfoResponse,
  SettleUpResponse
} from "../interfaces/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  //done
  public register(email: string, name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.nestBackend}/authentication/register`, {
      name, email, password
    });
  }

  //done
  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.nestBackend}/authentication/log-in`, {
      email, password
    }, {withCredentials: true});
  }

  //done
  public createGroup(groupName: string, usersEmails: string[]): Observable<AddGroupResponse> {
    return this.http.post<AddGroupResponse>(`${environment.nestBackend}/groups`, {
      groupName, usersEmails
    });
  }

  //done
  public searchGroup(userId: string): Observable<any> {
    let params = new HttpParams().set('userId', userId)
    return this.http.get<string[]>(`${environment.nestBackend}/groups/my-groups`, {
      params: params
    });
  }

  //done
  public getUsersInGroup(groupName: string, userId: number): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('userId', userId)
    params = params.append('groupName', groupName)
    return this.http.get<string[]>(`${environment.nestBackend}/groups/getUsers`, {
      params: params
    })
  }

  public addExpense(eachUserValue: [{ from: string, value: number }],
                    to: string,
                    description: string, groupName: string): Observable<AddExpenseResponse> {
    return this.http.post<AddExpenseResponse>(`${environment.nestBackend}/expenses`, {
      eachUserValue, to, description, groupName
    })
  }

  //done
  public addFriend(userId: string, email: string): Observable<string[]> {
    return this.http.post<string[]>(`${environment.nestBackend}/friends`, {
      userId, email
    })
  }

  //done
  public getFriendsList(userId: number): Observable<any> {
    let params = new HttpParams().set('userId', userId)
    return this.http.get<any>(`${environment.nestBackend}/friends`, {
      params: params
    })
  }

  //done
  public isUserInYourFriendsList(userId: number, friendEmail: string): Observable<any> {
    let params = new HttpParams;
    params = params.append('userId', userId);
    params = params.append('friendEmail', friendEmail);
    return this.http.get<any>(`${environment.nestBackend}/friends/check`, {
      params: params
    })
  }

  //done
  public isInFriendList(userId: number, friendEmail: string, groupName: string): Observable<any> {
    let params = new HttpParams;
    params = params.append('userId', userId);
    params = params.append('friendEmail', friendEmail);
    params = params.append('groupName', groupName);
    return this.http.get<any>(`${environment.nestBackend}/groups/check-for-expense`, {
      params: params
    })
  }

  //done
  public balanceCheck(userId: string): Observable<BalanceCheckResponse> {
    let params = new HttpParams().set('userId', userId)
    return this.http.get<BalanceCheckResponse>(`${environment.nestBackend}/users/balance-check`, {
      params: params
    })
  }

  public settleUpInfo(userId: string, groupName: string): Observable<SettleUpInfoResponse> {
    return this.http.post<SettleUpInfoResponse>(`${environment.apiUrl}/settle-up-info`, {
      userId, groupName
    })
  }

  public settleUp(userId: string, valueOwedToUser: [{ to: number, value: number }], groupName: string): Observable<SettleUpResponse> {
    return this.http.post<SettleUpResponse>(`${environment.apiUrl}/settle-up`, {
      userId, valueOwedToUser, groupName
    })
  }

  public expensesInfoPlus(userId: string, groupName: string): Observable<ExpensesInfo> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<ExpensesInfo>(`${environment.nestBackend}/expenses/plus`, {
      params: params
    })
  }

  public expensesInfoMinus(userId: string, groupName: string): Observable<ExpensesInfo> {
    return this.http.post<ExpensesInfo>(`${environment.apiUrl}/expenses-info-from-user`, {
      userId, groupName
    })
  }
}
