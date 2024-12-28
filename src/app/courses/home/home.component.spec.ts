import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesModule } from '../courses.module';
import {HomeComponent} from './home.component';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesService } from '../services/courses.service';
import { DebugElement } from '@angular/core';
import { setupCourses } from '../common/setup-test-data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: jasmine.SpyObj<CoursesService>;

  const beginnerCourses = setupCourses().filter(course => course.category == 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports:[
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy}
      ]
    }).compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
        });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mat-mdc-tab"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mat-mdc-tab"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mat-mdc-tab"));
    expect(tabs.length).toBe(2, "Expected to find 2 tabs");
  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    
    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mat-mdc-tab"));
    click(tabs[1]);
    fixture.detectChanges();
    
    flush();
    const cardTitles = el.queryAll(By.css(".mat-mdc-tab-body-active .mat-mdc-card-title"));
    expect(cardTitles.length).toBeGreaterThan(0, "Could not find cards titles");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
  }));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    
    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mat-mdc-tab"));
    click(tabs[1]);
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      const cardTitles = el.queryAll(By.css(".mat-mdc-tab-body-active .mat-mdc-card-title"));
      expect(cardTitles.length).toBeGreaterThan(0, "Could not find cards titles");

      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
    })
  }));
});


