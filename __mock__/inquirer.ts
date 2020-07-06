import * as inquirer from 'inquirer';
import { isFunction } from 'util';

jest.genMockFromModule('inquirer');

const db: any = {};

export function prompt(questions: inquirer.Question[]): Promise<inquirer.Answers> {
  const answers: inquirer.Answers = {};
  for (const q of questions) {
    const when = isFunction(q.when) ? (q as any).when(answers) : true;
    if (!when) {
      continue;
    }
    if(q.default) {
      answers[q.name] = isFunction(q.default) ? q.default(answers) : q.default;
    }
    if(q.validate) q.validate(db.answers[q.name], answers);
    const message = isFunction(q.message) ? (q as any).message(answers) : q.message;
    answers[q.name] = db.answers[q.name];
  }
  return Promise.resolve(answers);
}

export function setAnswers(answers: inquirer.Answers) {
  db.answers = answers;
}