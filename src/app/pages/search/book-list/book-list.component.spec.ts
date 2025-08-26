import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/book.service';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  const mockBooks: Book[] = [
    {
      isbn: '978-0132350884',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A Handbook of Agile Software Craftsmanship',
      coverImageUrl: 'https://example.com/clean-code.jpg',
      categories: ['Programming'],
    },
  ];

  beforeEach(async () => {
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks']);

    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '978-0132350884',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch book list on init', async () => {
    mockBookService.getBooks.and.returnValue(of(mockBooks));
    await component.ngOnInit();
    expect(component.books).toEqual(mockBooks);
  });
});
