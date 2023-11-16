interface ICache {
	data: any
	timer?: number
	startTime: number
}

class CacheMng {
	caches = new Map<string, ICache>()

	setItem(key: string, data: any, cacheTime: number = 0) {
		const currentCache = this.caches.get(key)
		if (currentCache?.timer) {
			clearTimeout(currentCache.timer)
		}
		let timer
		if (cacheTime > -1) {
			timer = window.setTimeout(() => {
				this.caches.delete(key)
			}, cacheTime)
		}
		this.caches.set(key, {
			data,
			timer,
			startTime: new Date().getTime()
		})
	}

	getItem(key: string) {
		const currentCache = this.caches.get(key)
		if (currentCache?.data) {
			return currentCache.data
		}
	}

	removeItem = (key: string) => {
		const currentCache = this.caches.get(key)
		if (currentCache) {
			clearTimeout(currentCache.timer)
			this.caches.delete(key)
		}
	}
}

const cacheMng = new CacheMng()

export default cacheMng
