import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../core/services/auth.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'login',
      'logout',
    ]);
    
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true when AuthService returns true', async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    await component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false when AuthService returns false', async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));
    await component.ngOnInit();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call AuthService.login when login is called', () => {
    component.login();
    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it('should call AuthService.logout when logout is called', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
