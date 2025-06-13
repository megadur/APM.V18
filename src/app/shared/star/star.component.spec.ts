import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarComponent } from './star.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarComponent],
      providers: [provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set starWidth correctly on ngOnChanges', () => {
    component.rating = 4;
    component.ngOnChanges();
    expect(component.starWidth).toBe(60);
  });

  it('should emit ratingClicked event with correct message on onClick', () => {
    spyOn(component.ratingClicked, 'emit');
    component.rating = 3;
    component.onClick();
    expect(component.ratingClicked.emit).toHaveBeenCalledWith('The rating 3 was clicked!');
  });
});
