import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private url: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.url}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.url}/capital/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.url}/name/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.url}/region/${region}`)
      .pipe(catchError((error) => of([])));
  }
}
