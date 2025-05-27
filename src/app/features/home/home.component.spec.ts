import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LogService } from '../../shared/util-logger';
import { InjectionToken } from '@angular/core';

export const LOG_APPENDERS = new InjectionToken<string[]>('LOG_APPENDERS');

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: LOG_APPENDERS, useValue: [] }, // Mock or actual value for LOG_APPENDERS
        provideHttpClientTesting(),
        LogService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
