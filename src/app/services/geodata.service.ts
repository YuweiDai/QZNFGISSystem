import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  constructor(private http:HttpClient ) { }

  /** GET heroes from the server */
  getQZBou (): Observable<any[]> {
    return this.http.get<any[]>('assets/data/qz.json')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }

  getCountyBou (): Observable<any[]> {
    return this.http.get<any[]>('assets/data/county.json')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }

  getTownBou (): Observable<any[]> {
    return this.http.get<any[]>('assets/data/town.json')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }

  getVillageBou (): Observable<any[]> {
    return this.http.get<any[]>('assets/data/village.json')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }
 
  getFWMBou (): Observable<any[]> {
    return this.http.get<any[]>('assets/data/fwm.json')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }


   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
     
  }
}
