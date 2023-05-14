import * as core from '@actions/core'
import * as github from '@actions/github'

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
    const { 
      context: { 
        repo: { owner, repo }, 
        payload: { pull_request, comment } 
      } 
    } = github
    
    if (!pull_request?.number || !comment || !comment?.id || !body || body === 'null') {
      return
    }

    await octokit.pulls.updateReviewComment({
      owner,
      repo,
      comment_id: comment.id,
      body,
    })

    const url = github.context.payload.pull_request?.html_url
    if (body) {
      core.info(`complete to modify translate pull_request body: ${body} in ${url} `)
    }
  }
}