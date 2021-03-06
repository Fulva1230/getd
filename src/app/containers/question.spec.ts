import { Question } from './question';

describe('Question', () => {
  it('basic question initialization', () => {
    const question = new Question('20210304', '20210304', ['Do you like apples?'], ['Yes', 'No']);
    expect(question.questionId).toBe('20210304');
    expect(question.title).toBe(question.questionId);
    expect(question.descriptions[0]).toBe('Do you like apples?');
  });
});
