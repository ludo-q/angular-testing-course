import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesModule } from '../courses.module';
import {HomeComponent} from './home.component';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesService } from '../services/courses.service';

describe('HomeComponent', () => {
  let component:HomeComponent;
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
   }).compileComponents().then(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
   });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    pending();

  });


  it("should display only advanced courses", () => {

      pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});


