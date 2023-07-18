import * as core from '@actions/core'
import GoogleTranslate from '@tomsun28/google-translate-api'
import { isEnglish } from './isEnglish'

export async function translate(text: string): Promise<string | undefined> {
  try {
    const resp = await GoogleTranslate(text, {to: 'en'})
    return resp.text !== text ? resp.text : ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    core.error(err)
    core.setFailed(err.message)
  }
}

const MAGIC_JOIN_STRING = '@@===='
export const translateText = {
  parse(text?: string) {
    if (!text) {
      return [ undefined, undefined ]
    }

    // fix translate "@@====" to "@@== =="
    const translateBody: string[] = text.split(/@@==\s?==/)
    return [ translateBody?.[0]?.trim(), translateBody[1].trim() ]
  },
  stringify(body?: string, title?: string) {
    let needCommitComment = body && body !== 'null' && !isEnglish(body)
    let needCommitTitle = title && title !== 'null' && !isEnglish(title)

    let translateOrigin = null

    if (!needCommitComment) {
      core.info('Detect the issue comment body is english already, ignore.')
    }
    if (!needCommitTitle) {
      core.info('Detect the issue title body is english already, ignore.')
    }
    if (!needCommitTitle && !needCommitComment) {
      core.info('Detect the issue do not need translated, return.')
      return translateOrigin
    }

    return [ body || 'null', title ].join(MAGIC_JOIN_STRING)
  }
}
