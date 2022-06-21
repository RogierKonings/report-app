export interface ReportFile {
  fileContent?: string;
  error?: ReportError
}

export interface ReportError {
  name: string;
  errorMessage: string;
}
