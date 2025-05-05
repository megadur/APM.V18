import { HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GetUserInfo200Response,
  UserserviceClient,
} from '../../../../generated/userservice-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  service = inject(UserserviceClient);

  constructor() {}
  onInit() {
    this.service.getUserInfo('gutachter').subscribe((res) => {
      console.log('UserService', res);
    });
  }

  getUser() {
    try {
      const data = this.service.getUserInfo(
        'gutachter',
        'body',
      ) as unknown as HttpResponse<GetUserInfo200Response>;

      console.log('UserService.getUser()', data.body);
      return data.body;
    } catch (error) {
      console.error('Error fetching getUserInfo:', error);
      throw error;
    }
  }
}
