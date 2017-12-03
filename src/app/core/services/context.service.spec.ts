import { RouterTestingModule } from '@angular/router/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextService } from './context.service';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should set Country', inject([ContextService], (service) => {
    service.setCountry('in');
    expect(service.country).toBe('in');
    expect(service.getCountry()).toBe('in');
  }));
});
