import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Client side or network error
            console.error(`An error occurred: ${error.error.message}`);
        } else {
            // Backend returned an unsuccessful response code
            console.error(`Backend returned code: ${error.status}, body was: ${error.error}`);
        }

        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    getVerb<T>(endpoint: string): Observable<T|any> {
        return this.http.get<T>(endpoint).pipe(
            catchError(this.handleError)
        );
    }

    postVerb<T>(endpoint: string, data: any, options?: any): Observable<T|any> {
        return this.http.post<T>(endpoint, data, options).pipe(
            catchError(this.handleError)
        );
    }

    putVerb<T>(endpoint: string, data: any, options?: any): Observable<T|any> {
        return this.http.put<T>(endpoint, data, options).pipe(
            catchError(this.handleError)
        );
    }

    deleteVerb<T>(endpoint: string, options?: any): Observable<T|any> {
        return this.http.delete<T>(endpoint, options).pipe(
            catchError(this.handleError)
        );
    }
}

