import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/book.service';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  const mockBook: Book = {
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A Handbook of Agile Software Craftsmanship',
    coverImageUrl: 'https://example.com/clean-code.jpg',
    categories: ['Programming'],
  };

  beforeEach(async () => {
    mockBookService = jasmine.createSpyObj('BookService', ['getBookDetails']);
    mockBookService.getBookDetails.and.returnValue(of(mockBook));

    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '978-0132350884', // key: isbn
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch book details on init', () => {
    expect(mockBookService.getBookDetails).toHaveBeenCalledWith(
      '978-0132350884'
    );
    expect(component.book).toEqual(mockBook);
  });
});
