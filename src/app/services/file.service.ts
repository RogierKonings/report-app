import {Injectable} from '@angular/core'
import {Observable, Observer} from 'rxjs'

import {isSupportedType, isValidString} from '../utils/validate.utils'
import {ReportFile} from '../models'

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public readFileContent(file: File): Observable<ReportFile> {
    const fileReader = new FileReader()
    return new Observable((obs: Observer<ReportFile>) => {
      const {name, type} = file
      fileReader.readAsText(file)
      fileReader.onload = () => {
        const content = fileReader.result as string
        if (!isSupportedType(type)) {
          obs.error(new Error(`${name} with ${type} is not a supported type`))
        }
        if (!isValidString(content)) {
          obs.error(new Error(`the output from ${name} is not a valid string`))
        }
        obs.next({content})
        obs.complete()
      }
      fileReader.onerror = () => {
        obs.error(new Error(`${type} is invalid`))
      }
    })
  }
}
