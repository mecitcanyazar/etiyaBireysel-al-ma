import { TestBed } from '@angular/core/testing';

import { MyInterceptorInterceptor } from './core/interceptors/date.interceptor';

describe('MyInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyInterceptorInterceptor = TestBed.inject(MyInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
