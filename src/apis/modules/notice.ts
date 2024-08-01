import http from '@/request/index'

// 获取消息通知
export const getNotice = () => http.get('/notice/list')
