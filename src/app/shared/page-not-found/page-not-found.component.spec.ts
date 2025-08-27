import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from '../../core/services/auth.service';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated$: new BehaviorSubject<boolean>(false),
    });

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

  it('should update isAuthenticated when auth state changes', () => {
    // Arrange
    const authSubject =
      authServiceSpy.isAuthenticated$ as BehaviorSubject<boolean>;
    component.ngOnInit();

    // Act & Assert - Test multiple state changes
    authSubject.next(true);
    expect(component.isAuthenticated).toBeTrue();

    authSubject.next(false);
    expect(component.isAuthenticated).toBeFalse();

    authSubject.next(true);
    expect(component.isAuthenticated).toBeTrue();
  });
});
