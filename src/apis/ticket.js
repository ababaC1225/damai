import request from '@/untils/request'

/**
 * 查询票档库存（示例返回 message 表示是否有票）
 * GET /api/ticket/{tierId}
 * @param {number|string} tierId
 */
export const checkTierStock = async (tierId) => {
  if (!tierId) throw new Error('tierId required')
  return request.get(`/api/ticket/${tierId}`)
}

/**
 * 抢票接口
 * POST /api/ticket/grab
 * body: { performanceId, sessionId, tierId, quantity }
 */
export const grabTicket = async (payload) => {
  if (
    !payload ||
    !payload.performanceId ||
    !payload.sessionId ||
    !payload.tierId ||
    !payload.quantity
  ) {
    throw new Error('payload missing required fields')
  }
  return request.post('/api/ticket/grab', payload)
}

// 使用示例（组件中直接调用）：
// import { grabTicket, checkTierStock } from '@/apis/ticket'
// const res = await checkTierStock(1)
// const order = await grabTicket({ performanceId:1, sessionId:1, tierId:1, quantity:1 })
