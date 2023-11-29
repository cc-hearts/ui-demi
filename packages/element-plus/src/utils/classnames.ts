import { isObject, isStr } from '@cc-heart/utils'

export function classnames(params: string | string[] | Record<string, any>) {
  if (isStr(params)) {
    return params
  }

  if (Array.isArray(params)) {
    return params.join(' ')
  }

  if (isObject(params)) {
    return Object.entries(params)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ')
  }
}
