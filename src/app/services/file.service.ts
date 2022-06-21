import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

import { FileTypes, ReportFile } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private _file: Subject<File> = new Subject();

  public readonly file$: Observable<File> = this._file.asObservable();

  public readFileContent(file: File): Observable<ReportFile> {
    const fileReader = new FileReader();
    return new Observable((obs: Observer<ReportFile>) => {
      fileReader.readAsText(file);
      const { name } = file;
      fileReader.onload = () => {
        if (!this.isSupportedType(file)) {
          obs.error({ error: { name, errorMessage: 'not supported type' } });
        }
        obs.next({ fileContent: fileReader.result as string});
        obs.complete();
      };
      fileReader.onerror = () => {
        obs.error({ error: { name, errorMessage: 'invalid file' } });
      };
    });
  }

  private isSupportedType(file: File): boolean {
    return file.type === FileTypes.CSV || file.type === FileTypes.XML;
  }
}
