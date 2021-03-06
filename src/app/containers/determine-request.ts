import {Determine} from './determine';

export class DetermineRequest {
  constructor(
    public determine: Determine,
    public  status: 'SUCCESS' | 'FAILURE' | 'PENDING' = 'PENDING'
  ) {
  }
}
