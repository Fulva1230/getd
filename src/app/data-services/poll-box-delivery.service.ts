import {Injectable} from '@angular/core';
import {PollListService} from '../cloudservices/poll-list.service';
import {PollBoxRes, PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Pollbox} from '../containers/pollbox';
import {Determine} from '../containers/determine';
import {map} from 'rxjs/operators';

type QuestionIdType = string;

export interface PollBoxReq {
  type: 'poll' | 'post';
  determine?: Determine;
  questionId?: QuestionIdType;
}

export interface PollBoxReqRes {
  req: PollBoxReq;
  status: 'SUCCESS' | 'FAIL';
}

@Injectable({
  providedIn: 'root'
})
export class PollBoxDeliveryService {
  private pollBoxsMap = new Map<QuestionIdType, Subject<PollBoxRes>>();

  constructor(
    private pollPullService: PollPullerService,
    private pollPostService: PollPosterService
  ) {
  }

  pollBoxObser(questionId: QuestionIdType): Observable<PollBoxRes> {
    const obser = this.pollBoxsMap.get(questionId);
    if (obser) {
      return obser;
    } else {
      const newObser = new ReplaySubject<PollBoxRes>(1);
      this.pollBoxsMap.set(questionId, newObser);
      return newObser;
    }
  }

  request(pollBoxReq: PollBoxReq): Observable<PollBoxReqRes> {
    switch (pollBoxReq.type) {
      case 'poll':
        return this.pollPullService.pull(pollBoxReq.questionId).pipe(
          map(res => {
            switch (res.status) {
              case 'SUCCESS':
                return {req: pollBoxReq, status: 'SUCCESS'};
              case 'FAIL':
                return {req: pollBoxReq, status: 'FAIL'};
            }
          }));
      case 'post':
        return this.pollPostService.post(pollBoxReq.determine).pipe(
          map(res => {

          })
        );
    }
  }

}
