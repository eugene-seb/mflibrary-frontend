import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookRowComponent } from './book-row.component';
import { KeycloakService } from 'keycloak-angular';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRowComponent],
      providers: [KeycloakService],
    }).compileComponents();

    fixture = TestBed.createComponent(BookRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
