import React, { useCallback, useEffect, useState } from 'react'
import { Drawer, Form, Input, Button, message } from 'antd'
import service from '../service'

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
}

interface IProps {
	visible: boolean
	id: number
	onClose: () => void
	onReload: () => void
}

const Edit: React.FC<IProps> = props => {
	const { id, visible, onClose, onReload } = props
	// 提交时的loading状态
	// const [loading, setLoading] = useState(false)
	const [detail, setDetail] = useState({})

	const getDetail = useCallback(async () => {
		if (!id) return
		const res = await service.getDetail(id)
		setDetail(res)
	}, [id])

	const handleSubmit = value => {
		if (id) {
			message.success('修改成功')
		} else {
			service.create(value).then(res => {
				message.success('新增成功')
				onClose()
				onReload()
			})
		}
	}

	const handleFinishFailed = () => {
		message.warning('请按照正确格式填写信息！')
	}

	useEffect(() => {
		getDetail()
	}, [getDetail])

	return (
		<Drawer
			title={`${id ? '修改' : '新增'}用户`}
			width={400}
			visible={visible}
			onClose={onClose}
			footer={null}
			destroyOnClose={true}
		>
			<Form
				layout="horizontal"
				colon
				labelAlign="left"
				{...formItemLayout}
				onFinish={handleSubmit}
				onFinishFailed={handleFinishFailed}
			>
				<Form.Item
					label="name"
					name="name"
					initialValue={detail.name}
					rules={[
						{
							required: true,
							message: 'please input name!'
						}
					]}
				>
					<Input placeholder="please input name" />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8 }}>
					<Button onClick={onClose}>取消</Button>
					<Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
						确认
					</Button>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export default Edit
