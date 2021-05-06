import {Determine} from './determine';

// TODO this can be removed
export class DetermineRequest {
  constructor(
    public determine: Determine,
    public  status: 'SUCCESS' | 'FAILURE' | 'PENDING' = 'PENDING'
  ) {
  }
}
