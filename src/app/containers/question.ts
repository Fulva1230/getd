export class Question {
  constructor(
    public questionId: string,
    public title: string,
    public descriptions: string[],
    public selections: string[]
  ) {
  }
}
