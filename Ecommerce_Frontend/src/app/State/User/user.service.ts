import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, of, tap } from "rxjs";
import { BASE_API_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { getUserProfileFailure, getUserProfileSuccess, logOutSuccess } from "./user.action";


@Injectable({providedIn: 'root',
})
export class UserService {
private apiUrl = `${BASE_API_URL}/api`;
  headers:any

  constructor(private http: HttpClient ,private store:Store) {

    this.headers=new HttpHeaders().set("Authorization",`Bearer $ 
        {localStorage.getItem("jwt")}` )
  }


  getUserProfile() {
    const headers= new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem("jwt")}`)
    return this.http.get(`${this.apiUrl}/users/profile`,{headers }).pipe(
      tap(data => console.log('Raw Data from Backend:', data)),
      map((user: any) => {
        console.log(' get user profile success',user)
        if (user.jwt) {
          localStorage.setItem("jwt", user.jwt);
        }
        return getUserProfileSuccess({userProfile:user}) ;
      }),
      catchError((error) =>{
        return of(
            getUserProfileFailure(
                error.response && error.response.data.message ?
                error.response.data.message : error.message
            )
        )
      })
    ).subscribe((action)=>this.store.dispatch(action))
  }
  
  logout(){
    localStorage.removeItem("jwt");
    this.store.dispatch(logOutSuccess())
  }

}

  