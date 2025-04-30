import { inject, Injectable } from '@angular/core';
import {
  AccountService,
  PermissionViewModel,
} from '../../../../generated/ArzQaWeb';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  accountService = inject(AccountService);
  permissions: PermissionViewModel[] | undefined | null = null;
  constructor() {}
  onInit() {
    this.accountService.accountPermissionsGet().subscribe((res) => {
      console.log('UserService', res);
    });
  }
  xgetUser(): Observable<PermissionViewModel[]> {
    this.accountService.accountPermissionsGet('body').subscribe({
      next: (data) => {
        this.permissions = data;
        //    console.log('Permissions:', this.permissions);
      },
      error: (error) => {
        console.error('Error fetching permissions:', error);
      },
    });

    console.log('UserService.getUser().permissions', this.permissions);
    return this.accountService.accountPermissionsGet('body');
  }
  async getUser() {
    try {
      const data = (await firstValueFrom(
        this.accountService.accountPermissionsGet('body'),
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
      const data = this.accountService.accountPermissionsGet(
        'body',
      ) as unknown as HttpResponse<PermissionViewModel[]>;

      this.permissions = data.body;
      console.log('UserService.getUser2().permissions', this.permissions);
      return data.body;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }
}
