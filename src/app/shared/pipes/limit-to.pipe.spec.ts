/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LimitToPipe } from './limit-to.pipe';

describe('LimitToPipe', () => {
  it('create an instance', () => {
    let pipe = new LimitToPipe();
    expect(pipe).toBeTruthy();
  });

  it('trims string', () => {
    let pipe = new LimitToPipe();
    expect(pipe.transform('abcdef', '2')).toBe('ab....');
    expect(pipe.transform(null, '2')).toBe('');
    expect(pipe.transform('12345678901234567890', '')).toBe('1234567890....');
  });
});
