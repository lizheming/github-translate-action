import * as github from '@actions/github'

import issues from './issues'
import discussion from './discussion'
import issue_comment from './issue_comment'
import discussion_comment from './discussion_comment'
import pull_request from './pull_request'
import pull_request_target from './pull_request'
import pull_request_review_comment from './pull_request_review_comment'


export const models = {
  issues,
  issue_comment,
  
  discussion,
  discussion_comment,

  pull_request,
  pull_request_target,
  pull_request_review_comment,
}

export type TRANSLATE_EVENT_NAME = keyof typeof models
export interface TRANSLATE_MODEL {
  readonly match: boolean
  readonly title?: string
  readonly body?: string
  update: (octokit: ReturnType<typeof github.getOctokit>, body?: string | null, title?: string | null) => Promise<any>
}
export default function getModel(): TRANSLATE_MODEL | undefined {
  return models[github.context.eventName as TRANSLATE_EVENT_NAME]
}