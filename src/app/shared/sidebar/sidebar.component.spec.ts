import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user-profile';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout'], {
      isAuthenticated$: new BehaviorSubject<boolean>(false),
      profile$: new BehaviorSubject<UserProfile | null>(null),
    });

    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login when login is called', () => {
    component.login();
    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it('should call AuthService.logout when logout is called', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should set isAuthenticated to true when AuthService returns true', async () => {
    const authSubject =
      authServiceSpy.isAuthenticated$ as BehaviorSubject<boolean>;
    authSubject.next(true);
    await component.ngOnInit();
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should set isAuthenticated to false when AuthService returns false', async () => {
    const authSubject =
      authServiceSpy.isAuthenticated$ as BehaviorSubject<boolean>;
    authSubject.next(false);
    await component.ngOnInit();
    expect(component.isAuthenticated).toBeFalse();
  });

  it('Should have the data of the authenticated user', async () => {
    const profileSubject =
      authServiceSpy.profile$ as BehaviorSubject<UserProfile | null>;
    profileSubject.next({
      id: '123',
      username: 'testuser',
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
    });
    await component.ngOnInit();
    expect(component.username).toEqual('testuser');
  });
});
