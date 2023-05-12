import {TestBed, inject} from '@angular/core/testing'

import {ReportService} from './report.service'

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ReportService],
    })
  })

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy()
  }))
})
