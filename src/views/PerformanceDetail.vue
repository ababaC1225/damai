<template>
	<div class="performance-detail page-wrap">
		<div v-if="loading" class="pd-loading">加载中…</div>

		<div v-else class="content">
			<div class="center-card">
				<div class="left">
					<div class="poster-area">
						<img v-if="performanceInfo.poster" :src="formatResourceUrl(performanceInfo.poster)" class="poster" />
					</div>

					<div class="title-area">
						<h1 class="perf-title">{{ performanceInfo.title || '演出名称' }}</h1>
						<div class="perf-sub">{{ performanceInfo.celebrity || performanceInfo.artist || '' }}</div>
					</div>

					<div class="session-selector" v-if="sessions && sessions.length">
						<div style="margin:8px 0">选择场次：</div>
						<div style="display:flex;flex-wrap:wrap;gap:8px">
							<el-button  v-for="s in sessions" :key="s.id" :type="String(s.id) === String(selectedSessionId) ? 'primary' : 'default'" size="small" @click="selectSession(s.id)">
								{{ formatDate(s.sessionTime || s.startTime || s.time) }}
							</el-button>
						</div>
					</div>

					<div class="desc-area">
						<h3>演出简介</h3>
						<div v-html="performanceInfo.description || performanceInfo.intro || '<p>暂无简介</p>'"></div>
					</div>
				</div>

				<aside class="right">
					<el-card class="buy-card" shadow="hover">
						<div class="price-row">
							<div>当前最低价</div>
							<div class="price-num">{{ lowestPrice === '--' ? '--' : '¥' + lowestPrice }}</div>
						</div>

						<el-divider></el-divider>

						<div class="select-row">
							<div class="label">选择场次</div>
							<el-select v-model="selectedSessionId" placeholder="先选择场次" @change="selectSession">
								<el-option v-for="s in sessions" :key="s.id" :label="formatDate(s.sessionTime || s.startTime || s.time) + ' ' + (s.venue || '')" :value="s.id"></el-option>
							</el-select>
						</div>

						<div class="select-row" v-if="currentTiers && currentTiers.length">
							<div class="label">选择票档</div>
							<el-select v-model="selectedTierId" placeholder="选择票档">
								<el-option v-for="t in currentTiers" :key="t.id" :label="t.tierName + ' ¥' + t.price" :value="t.id"></el-option>
							</el-select>
						</div>

						<div class="buy-actions" style="margin-top:12px">
							  <el-button type="primary" :disabled="!selectedTierId || isBuying" :loading="isBuying" @click="onBuy">立即购买</el-button>
						</div>
					</el-card>

					<div class="tiers-list" v-if="currentTiers && currentTiers.length" style="margin-top:12px; display:flex; justify-content:center">
						<div style="width:100%">
							<h4 style="text-align:center; margin-bottom:8px">票档列表</h4>
							<el-table :data="currentTiers" stripe style="width:100%" @row-click="selectTier">
								<el-table-column prop="tierName" label="票档"></el-table-column>
								<el-table-column prop="price" label="价格">
									<template #default="{ row }">¥{{ row.price }}</template>
								</el-table-column>
								<el-table-column label="剩余/总量">
									<template #default="{ row }">{{ row.availableQuantity || row.available || '-' }} / {{ row.totalQuantity || '-' }}</template>
								</el-table-column>
								<el-table-column label="操作" width="120">
									<template #default="{ row }">
										<el-button size="small" type="primary" @click.stop="selectTier(row.id)">选中</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/untils/request'

const route = useRoute()
const router = useRouter()
const perfId = Number(route.params.id)

const loading = ref(true)
const sessions = ref([])
const tiersMap = ref({})
const performanceInfo = ref({})

const selectedSessionId = ref(null)
const selectedTierId = ref(null)
const isBuying = ref(false)

function formatDate(v) {
	if (!v) return ''
	try { return new Date(v).toLocaleString() } catch (e) { return v }
}

function formatResourceUrl(url) {
	if (!url) return ''
	if (/^https?:\/\//.test(url)) return url
	return `http://193.112.68.157:8080${url.startsWith('/') ? '' : '/'}${url}`
}

const lowestPrice = computed(() => {
	let prices = []
	Object.values(tiersMap.value).forEach(list => {
		if (Array.isArray(list)) list.forEach(t => { const p = Number(t.price); if (!Number.isNaN(p)) prices.push(p) })
	})
	if (!prices.length) return '--'
	return Math.min(...prices)
})

const currentTiers = computed(() => tiersMap.value[selectedSessionId.value] || [])

async function loadPerformanceInfo() {
	try {
		const res = await request.get('/api/admin/performance/details', { params: { performanceId: perfId } })
		if (!res) return
		if (res && typeof res === 'object' && res.code === 401) return
		let info = {}
		if (res && res.data && typeof res.data === 'object') info = res.data
		else if (res && typeof res === 'object' && res.code !== undefined) info = res.data || {}
		else if (res && typeof res === 'object') info = res
		performanceInfo.value = info || {}
	} catch (e) {
		console.error('loadPerformanceInfo error', e)
	}
}

async function loadSessions() {
	loading.value = true
	try {
		const res = await request.get(`/api/performance/${perfId}`)
		if (res === null || res === undefined) { sessions.value = []; return }
		if (res && typeof res === 'object' && res.code === 401) { alert(res.message || '未登录'); sessions.value = []; router.push({ path: '/login' }); return }
		let arr = []
		if (Array.isArray(res)) arr = res
		else if (res && Array.isArray(res.data)) arr = res.data
		else if (res && Array.isArray(res.records)) arr = res.records
		else if (res && res.data && Array.isArray(res.data.records)) arr = res.data.records
		sessions.value = arr || []
	} catch (e) {
		console.error('loadSessions error', e)
		sessions.value = []
	} finally {
		loading.value = false
	}
}

async function handleLoadTiers(sessionId) {
	if (!sessionId) return
	try {
		const res = await request.get(`/api/performance/${sessionId}/ticket-tier`)
		if (res === null || res === undefined) { tiersMap.value = { ...tiersMap.value, [sessionId]: [] }; return }
		if (res && typeof res === 'object' && res.code === 401) { alert(res.message || '未登录'); tiersMap.value = { ...tiersMap.value, [sessionId]: [] }; router.push({ path: '/login' }); return }
		let arr = []
		if (Array.isArray(res)) arr = res
		else if (res && Array.isArray(res.data)) arr = res.data
		else if (res && Array.isArray(res.records)) arr = res.records
		else if (res && res.data && Array.isArray(res.data.records)) arr = res.data.records
		tiersMap.value = { ...tiersMap.value, [sessionId]: arr || [] }
	} catch (e) {
		console.error('loadTiers error', e)
		tiersMap.value = { ...tiersMap.value, [sessionId]: [] }
	}
}

function selectSession(id) {
	if (!id) return
	selectedSessionId.value = id
	selectedTierId.value = null
	handleLoadTiers(id)
}

function selectTier(id) { selectedTierId.value = id }

async function onBuy() {
	if (!selectedSessionId.value || !selectedTierId.value) { alert('请选择场次与票档'); return }
	if (isBuying.value) return
	isBuying.value = true
	try {
		const payload = {
			performanceId: perfId,//添加演出场次
			sessionId: selectedSessionId.value,
			ticketTierId: selectedTierId.value,
			quantity: 1
		}

		// 只调用后端标准下单接口 /api/order
		const res = await request.post('/api/order', payload)
		const body = res && (res.data !== undefined ? res.data : res)

		if (body && body.code && body.code !== 200) {
			alert(body.message || '下单失败')
		} else {
			alert((body && body.message) || '下单成功')
			// 刷新当前场次的票档
			await handleLoadTiers(selectedSessionId.value)
			// 查询票档库存提示（可选）
			try {
				const tk = await request.get(`/api/ticket/${selectedTierId.value}`)
				const msg = tk && (tk.message || (tk.data && tk.data.message))
				if (msg) alert('库存更新：' + msg)
			} catch (e) {
				console.warn('查询票档库存失败', e)
			}

			// 提取订单 ID 并跳转到订单详情
			let orderId = null
			if (body) {
				orderId = body.orderId || body.data?.orderId || body.id || body.data?.id || body.order_id || body.data?.order_id
			}
			if (orderId) {
				router.push(`/user/order/${orderId}`)
			}
		}
	} catch (e) {
		console.error('onBuy error', e)
		alert('下单失败，请重试')
	} finally {
		isBuying.value = false
	}
}

async function checkOpen(sessionId) {
	try {
		const res = await request.get(`/perform/status/${sessionId}`)
		const payload = res && (res.data !== undefined ? res.data : res)
		alert(payload && payload.message ? payload.message : '查询完成')
	} catch (e) { console.error('checkOpen error', e); alert('查询失败') }
}

onMounted(async () => {
	await loadPerformanceInfo()
	await loadSessions()
})
</script>


<style scoped>
.performance-detail { padding: 24px 18px; background: #f5f7fa; min-height: calc(100vh - 80px); display:block }
.pd-loading { padding: 40px; text-align:center; color:#999 }

/* 中心卡片 */
.center-card { max-width:1100px; width:100%; margin:0 auto; display:flex; gap:24px; align-items:flex-start; background:#fff; padding:20px; border-radius:10px; box-shadow:0 6px 18px rgba(20,30,40,0.06) }
.left { flex:1; min-width:0 }
.right { width:340px }

/* 海报与标题 */
.poster-area { display:flex; justify-content:center; margin-bottom:12px }
.poster { width:260px; height:auto; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.06); object-fit:cover }
.title-area { text-align:center; margin-bottom:12px }
.perf-title { margin:0; font-size:22px; font-weight:700 }
.perf-sub { color:#666; text-align:center; margin-top:6px }

/* 场次选择 */
.session-selector { display:flex; justify-content:center; margin:12px 0 }
.session-selector .el-button { border-radius:18px }

/* 描述区域 */
.desc-area { margin-top:16px; background:#fbfbfd; padding:14px; border-radius:8px; color:#333; line-height:1.6 }

/* 右侧购买卡 */
.buy-card { padding:12px }
.buy-card .price-row { display:flex; justify-content:space-between; align-items:center; font-size:14px; padding:6px 0 }
.price-num { font-size:18px; color:#e53935; font-weight:700 }
.select-row { margin-top:10px }
.buy-actions { text-align:center }

/* 表格居中 */
.tiers-list { display:flex; justify-content:center }
.tiers-list > div { max-width:760px; width:100% }
.tiers-list h4 { text-align:center; margin:0 0 10px }
.el-table { border-radius:6px; overflow:hidden; background:#fff }

/* 小屏适配 */
@media (max-width: 900px) {
	.center-card { flex-direction:column; padding:14px }
	.right { width:100% }
	.poster { width:200px }
}

.is-selected-row { background:#f0f9ff !important }
</style>

