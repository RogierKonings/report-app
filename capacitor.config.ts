import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.reportapp',
  appName: 'report-app',
  webDir: 'dist/report-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
