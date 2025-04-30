import { inject, Injectable } from '@angular/core';
import {
  AccountService,
  PermissionViewModel,
} from '../../../../generated/ArzQaWeb';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import {
  GutachterDto,
  UserserviceService,
} from '../../../../generated/userservice-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  service = inject(UserserviceService);
  permissions: any;

  constructor() {}
  onInit() {
    this.service.getUserInfo('gutachter').subscribe((res) => {
      console.log('UserService', res);
    });
  }
  getUser1(): Observable<GutachterDto> {
    this.service.getUserInfo('gutachter').subscribe({
      next: (data: any) => {
        this.permissions = data;
        //    console.log('Permissions:', this.permissions);
      },
      error: (error) => {
        console.error('Error fetching permissions:', error);
      },
    });
    return this.service.getUserInfo('gutachter') as Observable<GutachterDto>;
  }
  async getUser() {
    try {
      const data = (await firstValueFrom(
        this.service.getUserInfo('body'),
      )) as unknown as HttpResponse<PermissionViewModel[]>;
      this.permissions = data.body;
      console.log('UserService.getUser().permissions', this.permissions);
      return data.body;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }
  getUser2() {
    try {
      const data = this.service.getUserInfo('body') as unknown as HttpResponse<
        PermissionViewModel[]
      >;

      this.permissions = data.body;
      console.log('UserService.getUser2().permissions', this.permissions);
      return data.body;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }
}
