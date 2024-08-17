import { VNode } from 'vue'
import type { UploadFile } from 'element-plus'
import { isStr } from '@cc-heart/utils'

export interface UploadProps {
  /**
   * 按钮文字
   * @default '上传文件'
   */
  text?: string
  /**
   * 上传类型
   * @default 'text'
   */
  type?: 'picture' | 'text' | 'picture-card'
  /**
   * 文件上传 url地址
   * @default #
   */
  url?: string
  /**
   * 组件值
   * @default ''
   */
  modelValue?: string
  /**
   * 是否允许多文件上传
   * @default false
   */
  multiple?: boolean
  /**
   * 最大上传数
   * @default 1
   */
  limit?: number
  /**
   * 允许上传的文件列表
   * @default: null
   */
  acceptList?: string[] | null
  /**
   * 默认的文件列表
   * @default []
   */
  defaultFileList?: string[]
  /**
   * 上传按钮前缀图标
   * @default null
   */
  icon?: VNode | null

  /**
   * 文件上传的请求头
   * @returns
   */
  uploadHeaders: () => Record<string, any>
  /**
   * 文件上传错误回调函数
   * @param error
   * @returns
   */
  errorFn?: (error: any) => void
  /**
   * 文件上传提示占位符
   * @default ''
   */
  placeholder?: string
}

let uid = -100
/**
 * @private
 * @param fileList
 * @returns
 */
export function parseFileListToPreviewList(
  fileList: (UploadFile | string)[]
): UploadFile[] {
  return fileList.map((target) => {
    if (isStr(target)) {
      return {
        url: target,
        uid: --uid,
        status: 'success',
        name: target.split('/').pop() || '',
      }
    }
    return target
  })
}
