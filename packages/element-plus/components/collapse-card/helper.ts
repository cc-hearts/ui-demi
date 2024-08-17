import { defineCssNamespace } from '../_utils/css-namespace'

export interface Props {
  /**
   * @description:  title card
   */
  title: string
  /**
   * @description: collapse of card
   */
  collapse: boolean
}

export const ns = defineCssNamespace('collapse-card')
