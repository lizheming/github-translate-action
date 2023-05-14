import * as github from '@actions/github'
import { updateIssue } from '../utils'

export default {
  get match() {
    const { context: { payload: { issue } } } = github
    return Boolean(issue?.number)
  },
  get title() {
    return undefined
  },
  get body() {
    return github.context.payload.comment?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string | null): Promise<void> {
    const { context: { payload: { issue, comment } } } = github
    return updateIssue({
      issue_number: issue?.number,
      comment_id: comment?.id,
      body: body && body !== 'null' ? body : undefined,
      octokit
    })
  }
}