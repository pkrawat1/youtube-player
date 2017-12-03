/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';
import { ContextService } from 'app/core/services/context.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { countryList } from 'app/core/data/country-list';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        FormsModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [ContextService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Country', inject([ContextService], (service) => {
    const selectCountry = countryList[0];
    component.selectCountry(selectCountry);
    expect(service.getCountry()).toBe(selectCountry.code);
  }));

  it('should get country for search term', () => {
    const selectCountry = countryList[0];
    component.search(of(selectCountry.name)).subscribe(
      countries => {
        expect(countries[0].name).toBe(selectCountry.name);
        expect(countries[0].code).toBe(selectCountry.code);
      }
    )
  });

  it('should not get country for search term with less than 2 character', () => {
    const selectCountry = countryList[0];
    component.search(of('i')).subscribe(
      countries => {
        expect(countries.length).toBe(0);
      }
    )
  });

  it('should get country name from formatter', () => {
    const selectCountry = countryList[0];
    expect(component.formatter(selectCountry)).toBe(selectCountry.name);
  });

  it('should set country in context service',
    inject([ContextService], (service) => {
      let selectCountry = countryList[0];
      expect(component.selectCountry(selectCountry)).toBeUndefined();
      expect(service.getCountry()).toBe(selectCountry.code);
    })
  );

  it('should not set country in context service if selectedCountry is null',
    inject([ContextService], (service) => {
      expect(component.selectCountry(null)).toBeUndefined();
      expect(service.getCountry()).toBe('');
    })
  );
});
