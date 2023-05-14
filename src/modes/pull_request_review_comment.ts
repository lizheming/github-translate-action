import * as github from '@actions/github'
import { updateIssue } from '../utils'

export default {
  get match() {
    const { context: { payload: { pull_request } } } = github
    return Boolean(pull_request?.number)
  },
  get title() {
    return undefined
  },
  get body() {
    return github.context.payload.comment?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string | null): Promise<void> {
    const { context: { payload: { pull_request, comment } } } = github
    return updateIssue({
      issue_number: pull_request?.number,
      comment_id: comment?.id,
      body: body && body !== 'null' ? body : undefined,
      octokit
    })
  }
}