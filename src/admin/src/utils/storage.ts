export default class Storage {
	/* 本方法获取本地存储值 */
	static getKey(key: string) {
		const result: any = window.localStorage.getItem(key)
		try {
			return JSON.parse(result)
		} catch (error) {
			return result
		}
	}

	/* 本方法设置本地存储值 */
	static setKey(key: string, value: any) {
		const val = typeof value === 'string' ? value : JSON.stringify(value)
		window.localStorage.setItem(key, val)
	}

	/* 本方法移除指定的本地存储值 */
	static removeKey(key: string): void {
		window.localStorage.removeItem(key)
	}

	/* 本方法清除所有的本地存储值 */
	static clear() {
		window.localStorage.clear()
	}
}
