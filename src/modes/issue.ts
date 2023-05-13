import * as github from '@actions/github'
import { updateIssue } from '../utils'

export default {
  get match() {
    const { context: { payload: { issue } } } = github
    return Boolean(issue?.number)
  },
  get title() {
    return github.context.payload.issue?.title
  },
  get body() {
    return github.context.payload.issue?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string, title?: string): Promise<void> {
    const { context: { payload: { issue } } } = github
    return updateIssue({
      issue_number: issue?.number,
      title,
      body,
      octokit
    })
  }
}