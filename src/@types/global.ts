export {}
declare global {
  interface Window {
    $_: typeof import('lodash')
  }

  // 状态
  type Status = 'primary' | 'success' | 'warning' | 'danger' | 'info'
  // 操作类型
  type Operation = 'add' | 'edit' | 'detail' | 'delete'
}
