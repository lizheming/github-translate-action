import * as github from '@actions/github'

import issue from './issue'
import discussion from './discussion'
import issue_comment from './issue_comment'
import discussion_comment from './discussion_comment'
import pull_request from './pull_request'

export const models = {
  issue,
  issue_comment,
  discussion,
  discussion_comment,
  pull_request,
}

export type TRANSLATE_EVENT_NAME = keyof typeof models
export interface TRANSLATE_MODEL {
  readonly match: boolean
  readonly title?: string
  readonly body?: string
  update: (octokit: ReturnType<typeof github.getOctokit>, body?: string | null, title?: string | null) => Promise<any>
}
export default function getModel(): TRANSLATE_MODEL {
  return models[github.context.eventName as TRANSLATE_EVENT_NAME]
}