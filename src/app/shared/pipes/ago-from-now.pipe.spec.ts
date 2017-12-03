import { AgoFromNowPipe } from './ago-from-now.pipe';
import * as moment from 'moment';

describe('AgoFromNowPipe', () => {
  it('create an instance', () => {
    const pipe = new AgoFromNowPipe();
    expect(pipe).toBeTruthy();
  });

  it('shows time from now', () => {
    const pipe = new AgoFromNowPipe();
    const timeNow = moment('2016-01-01');
    const fromNow = moment(timeNow).fromNow();
    expect(pipe.transform(timeNow)).toBeTruthy(fromNow);
  });
});
