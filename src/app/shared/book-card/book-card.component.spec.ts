import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { BookCardComponent } from './book-card.component';
import { AuthService } from '../../core/services/auth.service';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['login', 'logout'],
      {
        isAuthenticated$: new BehaviorSubject<boolean>(false),
        profile$: new BehaviorSubject(null),
      }
    );

    await TestBed.configureTestingModule({
      imports: [BookCardComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
