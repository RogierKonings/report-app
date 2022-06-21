import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { isSupportedType, isValidString } from 'src/app/utils/validate.utils';
import { ReportFile } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public readFileContent(file: File): Observable<ReportFile> {
    const fileReader = new FileReader();
    return new Observable((obs: Observer<ReportFile>) => {
      const { name, type } = file;
      fileReader.readAsText(file);
      fileReader.onload = () => {
        const content = fileReader.result as string;
        if (!isSupportedType(type)) {
          obs.error({ error: { name, message: `${type} is not a supported type` } });
        }
        if (!isValidString(content)) {
          obs.error({ error: { name, message: 'the output is not a valid string' } });
        }
        obs.next({content});
        obs.complete();
      };
      fileReader.onerror = () => {
        obs.error({ error: { name, message: 'the file is invalid' } });
      };
    });
  }
}
