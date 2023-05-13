import * as core from '@actions/core'
import * as github from '@actions/github'
import { createDiscussionComment } from './createDiscussionComment'

interface CreateIssueCommentParameters {
  pull_number?: number
  discussion_number?: number
  issue_number?: number
  body: string
  octokit: ReturnType<typeof github.getOctokit>
}

export async function createIssueComment({
  pull_number,
  discussion_number,
  issue_number,
  body,
  octokit
}: CreateIssueCommentParameters): Promise<void> {
  const {owner, repo} = github.context.repo
  if (discussion_number) {
    return createDiscussionComment({
      discussion_number,
      body,
      octokit
    })
  }

  const number = issue_number || pull_number
  if (!number) {
    return
  }
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body
  })

  const url = github.context.payload?.issue?.html_url
  core.info(`complete to push translate issue comment: ${body} in ${url} `)
}
