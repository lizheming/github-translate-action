import * as github from '@actions/github'
import { updateIssue } from '../utils'

export default {
  get match() {
    const { context: { payload: { discussion } } } = github
    return Boolean(discussion?.number)
  },
  get title() {
    return github.context.payload.discussion?.title
  },
  get body() {
    return github.context.payload.discussion?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string | null, title?: string | null) {
    const { context: { payload: { discussion } } } = github
    return updateIssue({
      discussion_number: discussion.node_id,
      title: title && title !== 'null' ? title : undefined,
      body: body && body !== 'null' ? body : undefined,
      octokit
    })
  }
}