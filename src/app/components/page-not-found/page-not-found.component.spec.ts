import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from '../../core/services/auth.service';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have it's property isLoggedIn at true when AuthService.isLoggedIn return true", async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    await component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it("Should have it's property isLoggedIn at false when AuthService.isLoggedIn return false", async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));
    await component.ngOnInit();
    expect(component.isLoggedIn).toBeFalse();
  });
});
