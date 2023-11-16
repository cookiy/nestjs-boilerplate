import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import accountStore from '@/store/account'
import request from '@/utils/request'
import service from '../service'
import '../style.less'

const Login: React.FC = () => {
	const history = useHistory()
	const setToken = accountStore(state => state.setToken)
	const setAccountInfo = accountStore(state => state.setAccountInfo)

	// 提交
	const handleFinish = async values => {
		const data = await service.login(values)
		const token = data.token
		const accountInfo = data.accountInfo
		request.setHeader({ Authorization: `Bearer ${token}` })
		setToken(token)
		setAccountInfo(accountInfo)
		history.replace('/')
	}

	return (
		<div className="page-login">
			<div className="page-login__title">admin</div>
			<Form onFinish={handleFinish}>
				<Form.Item
					label={<div className="form-item__label">账号</div>}
					name="username"
					validateTrigger="onBlur"
					initialValue=""
					rules={[{ required: true, message: '账号不能为空' }]}
				>
					<Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号" />
				</Form.Item>
				<Form.Item
					label={<div className="form-item__label">密码</div>}
					name="password"
					validateTrigger="onBlur"
					initialValue=""
				>
					<Input
						prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="请输入密码"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block={true}>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
