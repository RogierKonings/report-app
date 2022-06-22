import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReportPageComponent } from './report-page.component';
import { ReportService } from '../../services/report.service';
import { of } from 'rxjs';

class ReportServiceMock {
  createReport() {
    jest.fn();
  }
}

describe('ReportPageComponent', () => {
  let component: ReportPageComponent;
  let fixture: ComponentFixture<ReportPageComponent>;
  let reportService: ReportService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ReportService, useClass: ReportServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reportService = TestBed.inject(ReportService);
  });

  describe('when opening a file', () => {
    it('should call the create report method from the report service', () => {
      const blob = new Blob([''], { type: 'text/csv' });
      const fakeFile = blob as File;

      spyOn(reportService, 'createReport').and.returnValue(of({}));
      component.openFile(fakeFile);
      expect(reportService.report$).toEqual('')
    });

    // it('should show an error message when the report service returns an error', () => {
    //   const blob = new Blob([''], { type: 'text/csv' });
    //   const fakeFile = blob as File;

    //   spyOn(reportService, 'createReport').and.throwError(
    //     'something went wrong!'
    //   );

    //   component.openFile(fakeFile);
    //   fixture.detectChanges();
    //   const warning = fixture.debugElement.query(
    //     By.css('.alert-danger')
    //   ).nativeElement;

    //   expect(warning).toBeTruthy();
    // });
  });
});
