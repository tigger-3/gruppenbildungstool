import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConfigService {
  moodle_address?: string;
  webservice_token?: string;
  service_shortname ?: string;

  constructor() { }
}
