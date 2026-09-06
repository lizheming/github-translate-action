import GoogleTranslate from 'google-translate-api-x'
import {translate} from '../src/utils/translate'

jest.mock('google-translate-api-x', () => jest.fn())

const mockTranslate = GoogleTranslate as jest.MockedFunction<
  typeof GoogleTranslate
>

describe('translate', () => {
  beforeEach(() => {
    mockTranslate.mockReset()
  })

  it('uses the batch endpoint for a successful translation', async () => {
    mockTranslate.mockResolvedValueOnce({text: 'Hello'} as never)

    await expect(translate('你好')).resolves.toBe('Hello')
    expect(mockTranslate).toHaveBeenCalledWith('你好', {
      to: 'en',
      forceBatch: true,
      rejectOnPartialFail: true
    })
  })

  it('propagates a batch request failure', async () => {
    const error = new Error('Batch request failed')
    error.name = 'HTTPError'
    mockTranslate.mockRejectedValueOnce(error)

    await expect(translate('你好')).rejects.toBe(error)
  })

  it('propagates a partial batch failure', async () => {
    const error = new Error('Partial Translation Request Fail')
    mockTranslate.mockRejectedValueOnce(error)

    await expect(translate('你好')).rejects.toBe(error)
  })
})
