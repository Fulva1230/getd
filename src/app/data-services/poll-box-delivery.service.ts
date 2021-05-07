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
  private pollBoxsMap = new Map<QuestionIdType, Subject<Pollbox>>();

  constructor(
    private pollPullService: PollPullerService,
    private pollPostService: PollPosterService
  ) {
  }

  private pollBoxSubject(questionId: QuestionIdType): Subject<Pollbox> {
    const obser = this.pollBoxsMap.get(questionId);
    if (obser) {
      return obser;
    } else {
      const newObser = new ReplaySubject<Pollbox>(1);
      this.pollBoxsMap.set(questionId, newObser);
      return newObser;
    }
  }

  pollBoxObser(questionId: QuestionIdType): Observable<Pollbox> {
    return this.pollBoxSubject(questionId);
  }

  request(pollBoxReq: PollBoxReq): Observable<PollBoxReqRes> {
    switch (pollBoxReq.type) {
      case 'poll':
        return this.pollPullService.pull(pollBoxReq.questionId).pipe(
          map(res => {
            switch (res.status) {
              case 'SUCCESS':
                this.pollBoxSubject(pollBoxReq.questionId).next(res.pollBox);
                return {status: 'SUCCESS', req: pollBoxReq};
              case 'FAIL':
                return {status: 'FAIL', req: pollBoxReq};
            }
          }));
      case 'post':
        return this.pollPostService.post(pollBoxReq.determine)
          .pipe(
            map(res => {
              switch (res.status) {
                case 'SUCCESS':
                  return {status: 'SUCCESS', req: pollBoxReq};
                case 'FAIL':
                  return {status: 'FAIL', req: pollBoxReq};
              }
            })
          );
    }
  }

}
