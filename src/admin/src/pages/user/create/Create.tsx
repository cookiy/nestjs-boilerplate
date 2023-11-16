import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import service from '@/pages/user/service'
import './style.less'

const CreateUser: React.FC = () => {
	const history = useHistory()
	const handleFinish = async values => {
		const data = await service.create(values)
		console.log('debug', data)
		history.replace('/user/list')
	}

	return (
		<div className="create-host-form">
			<Form onFinish={handleFinish}>
				<Form.Item name="username" label="姓名" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="password" label="密码" rules={[{ required: true }]}>
					<Input type="password" />
				</Form.Item>
				<Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
					<Input />
				</Form.Item>

				<Form.Item className="create-host-form-footer">
					<Button type="primary" htmlType="submit" block={true}>
						创建
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default CreateUser
