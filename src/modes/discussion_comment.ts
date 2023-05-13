import * as github from '@actions/github'
import { updateIssue } from '../utils'

export default {
  get match() {
    const { context: { payload: { discussion } } } = github
    return Boolean(discussion?.number)
  },
  get title() {
    return undefined
  },
  get body() {
    return github.context.payload.discussion?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string, title?: string) {
    const { context: { payload: { discussion, comment } } } = github
    return updateIssue({
      discussion_number: discussion.node_id,
      comment_id: comment?.node_id,
      title,
      body,
      octokit
    })
  }
}