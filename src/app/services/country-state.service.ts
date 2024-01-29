import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../common/country-state-city/country';
import { Observable, map } from 'rxjs';
import { State } from '../common/country-state-city/state';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  private countryUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states';

  private countryApiUrl = 'https://api.countrystatecity.in/v1/countries';

  httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSCAPI-KEY': 'N2RnVXZWTmVIUlZRbHI1TlVGY0hKSjJsejhjdDJrSUQ2OENDTEQ2Rg=='
    }),
  }

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<Country[]>(this.countryApiUrl, {headers: this.httpOptions.header});
  }

  getStates(countryCode: string): Observable<State[]>{    
    const statesUrl = `${this.countryApiUrl}/${countryCode}/states`;
    return this.httpClient.get<State[]>(statesUrl, {headers: this.httpOptions.header});
  }
  
}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}