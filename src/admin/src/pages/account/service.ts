import request from '@/utils/request'

// 登录
const login = async (value: any) => {
	const { username, password } = value
	const params = {
		username,
		password
	}
	const res = await request.post('auth/login', params)
	return {
		token: res.token,
		accountInfo: res.user
	}
}

// sso login
const sso = async (value: any) => {
	const { id, token } = value
	const params = {
		appId: id,
		token
	}
	const res = await request.post('user/sso', params)
  console.log(res)
	return res
}

export default {
	login,
	sso
}
