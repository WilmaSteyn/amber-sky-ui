import { TestBed } from '@angular/core/testing';

import { HttpAddHeadersInterceptor } from './http-add-headers-interceptor.service';

describe('HttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAddHeadersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAddHeadersInterceptor = TestBed.inject(HttpAddHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
