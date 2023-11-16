export const objectToArray = (obj: object) => {
	const keys = Object.keys(obj)
	const res: Array<any> = []
	for (let i = 0; i < keys.length; i++) {
		const name = keys[i]
		const version = obj[keys[i]]
		const item = {
			name,
			semantic: version.includes('^') ? '^' : '',
			version: version.includes('^') ? version.replace('^', '') : version
		}
		res.push(item)
	}
	return res
}
export const ArrayToObject = (arr: Array<any>) => {
	const parmas = {}
	for (let index = 0; index < arr.length; index++) {
		const name = arr[index].name
		const version = arr[index].version
		const semantic = arr[index].semantic
		const comVersion = `${semantic}${version}`
		Object.assign(parmas, { [name]: comVersion.trim() })
	}
	return parmas
}
export const isRepeat = (name, arr) => {
	for (let i = 0; i < arr.length; i++) {
		console.log(arr.indexOf(arr[i]))
		const arrName = arr[i].name
		if (arrName === name) {
			return false
		}
	}
	return true
}

export const getHistoryUrlParams = (name: string) => {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
	const r = window.location.search.substring(1).match(reg) // 匹配目标参数
	if (r !== null) return decodeURI(r[2])
	return null // 返回参数值
}

export const getHashUrlParams = () => {
	const url = window.location.hash
	const obj = {}
	if (url.indexOf('?') !== -1) {
		const startIndex = url.indexOf('?') + 1
		const str = url.substring(startIndex)
		const strs = str.split('&')
		for (const str of strs) {
			const [key, value] = str.split('=')
			obj[key] = value
		}
		return obj
	}
}
