import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ContextService } from 'app/core/services/context.service';
import { countryList } from 'app/core/data/country-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public selectedCountry: any;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : countryList.filter(v => new RegExp(term, 'gi').test(v.name)).splice(0, 10));

  formatter = (x: { name: string }) => x.name;

  constructor(public appContext: ContextService) {
  }

  public selectCountry(country) {
    if (typeof country === 'object') {
      this.appContext.setCountry(country.code);
    }
  }

  ngOnInit() {
  }
}
