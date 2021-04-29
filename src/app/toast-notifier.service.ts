import {Injectable} from '@angular/core';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastNotifierService {
  constructor(private toastService: NbToastrService) {
  }

  success(msg: string): void {
    this.toastService.success(msg, 'SUCCESS');
  }

  fail(msg: string): void {
    this.toastService.warning(msg, 'FAILURE');
  }
}
