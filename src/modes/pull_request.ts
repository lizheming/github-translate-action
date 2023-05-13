import * as core from '@actions/core'
import * as github from '@actions/github'

export default {
  get match() {
    const { context: { payload: { pull_request } } } = github
    return Boolean(pull_request?.number)
  },
  get title() {
    return github.context.payload.pull_request?.title
  },
  get body() {
    return github.context.payload.pull_request?.body
  },
  async update(octokit: ReturnType<typeof github.getOctokit>, body?: string, title?: string): Promise<void> {
    const { 
      context: { 
        repo: { owner, repo }, 
        payload: { pull_request } 
      } 
    } = github
    
    if (!pull_request?.number) {
      return
    }

    await octokit.pulls.update({
      owner,
      repo,
      pull_number: pull_request?.number,
      title,
      body
    })

    const url = github.context.payload.pull_request?.html_url
    if (title) {
      core.info(`complete to modify translate pull_request title: ${title} in ${url} `)
    }

    if (body) {
      core.info(`complete to modify translate pull_request body: ${body} in ${url} `)
    }
  }
}