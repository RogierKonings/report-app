import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FileService],
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));

  describe('supported file types', () => {

    // it('should allow csv', inject([FileService], (service: FileService) => {
    //   const blob = new Blob([''], { type: 'text/csv'});
    //   const fakeFile = blob as File;
    //   const result = service.isSupportedType(fakeFile);
    //   expect(result).toBeTruthy();
    // }));

    // it('should allow xml', inject([FileService], (service: FileService) => {
    //   const blob = new Blob([''], { type: 'text/xml'});
    //   const fakeFile = blob as File;
    //   const result = service.isSupportedType(fakeFile);
    //   expect(result).toBeTruthy();
    // }));

    // it('should not allow other file types', inject([FileService], (service: FileService) => {
    //   const otherTypes = ['text/plain', 'text/html', 'text/css', 'application/json', 'application/pdf'];
    //   otherTypes.forEach((type) => {
    //     const blob = new Blob([''], { type });
    //     const fakeFile = blob as File;
    //     const result = service.isSupportedType(fakeFile);
    //     expect(result).toBeFalsy();
    //   })
    // }));
  });

});
