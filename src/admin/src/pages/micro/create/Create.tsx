import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import service from '@/pages/micro/service'
import './style.less'

const { Option } = Select

const CreateHost: React.FC = () => {
	const history = useHistory()

	function handleChange(value) {
		console.log(`selected ${value}`)
	}
	// 提交
	const handleFinish = async values => {
		const data = await service.create(values)
		console.log('debug', data)
		history.replace('/micro/list')
	}

	return (
		<div className="create-host-form">
			<Form onFinish={handleFinish}>
				<Form.Item name="name" label="名称" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="描述" rules={[{ required: true }]}>
					<Input.TextArea />
				</Form.Item>
				<Form.Item name="gitUrl" label="代码库" rules={[{ required: true, message: '必须填写代码库' }]}>
					<Input />
				</Form.Item>
				<Form.Item name="rootPath" label="根路径" rules={[{ required: true, message: 'rootPath' }]}>
					<Input />
				</Form.Item>
				<Form.Item name="type" label="类型" rules={[{ required: true }]}>
					<Select
						style={{ width: '100%' }}
						placeholder="select type"
						defaultValue={[]}
						onChange={handleChange}
						optionLabelProp="label"
					>
						<Option value="APPLICATION" label="APPLICATION">
							<div className="demo-option-label-item">APPLICATION</div>
						</Option>
						<Option value="COMPONENT" label="COMPONENT">
							<div className="demo-option-label-item">COMPONENT</div>
						</Option>
						<Option value="UTIL" label="UTIL">
							<div className="demo-option-label-item">UTIL</div>
						</Option>
						<Option value="PLUGIN" label="PLUGIN">
							<div className="demo-option-label-item">PLUGIN</div>
						</Option>
						<Option value="IFRAME" label="IFRAME">
							<div className="demo-option-label-item">IFRAME</div>
						</Option>
					</Select>
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

export default CreateHost
