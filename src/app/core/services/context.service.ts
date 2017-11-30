import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ContextService {
  public country: string;
  countryChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  setCountry(country) {
    this.country = country;
    this.router.navigate(['']);
    this.countryChanged.emit(this.country);
  }

  getCountry() {
    return this.country;
  }
}
