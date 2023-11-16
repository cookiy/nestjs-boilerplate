import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Select, Tabs, message } from 'antd'
import service from '@/pages/micro/service'
import '@/pages/micro/edit/style.less'

const { Option } = Select
const { TabPane } = Tabs
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
}

const MicroEdit: React.FC = () => {
	const routeParams: any = useParams()
	const id: string = routeParams.id
	const [form] = Form.useForm()

	const getDetail = useCallback(async () => {
		const res = await service.getDetail(id)
		/* 通过setFieldsValue设置表单item的值，其中， name是Form.item的name值 */
		form.setFieldsValue({ ...res })
	}, [form, id])

	function handleChange(value) {
		console.log(`selected ${value}`)
	}
	const handleFinish = async values => {
		const { name, description, gitUrl, rootPath, type } = values
		const parmas = { name, description, gitUrl, rootPath, type }
		await service.update(id, parmas)
		message.success('更新成功')
	}
	useEffect(() => {
		getDetail()
	}, [getDetail])

	return (
		<React.Fragment>
			<div className="update-host-page">
				<Tabs defaultActiveKey="1" centered>
					<TabPane tab="基本信息" key="1">
						<div className="update-host-form">
							<Form form={form} {...formItemLayout} onFinish={handleFinish}>
								<Form.Item name="name" label="名称" rules={[{ required: true }]}>
									<Input />
								</Form.Item>
								<Form.Item name="description" label="描述" rules={[{ required: true }]}>
									<Input.TextArea />
								</Form.Item>
								<Form.Item
									name="gitUrl"
									label="代码库"
									rules={[{ required: true, message: '必须填写代码库' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="rootPath"
									label="rootPath"
									rules={[{ required: true, message: 'rootPath' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item name="type" label="type" rules={[{ required: true }]}>
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
								<Form.Item className="update-host-form-footer" wrapperCol={{ offset: 2 }}>
									<Button type="primary" htmlType="submit" block={true}>
										更新
									</Button>
								</Form.Item>
							</Form>
						</div>
					</TabPane>
				</Tabs>
			</div>
		</React.Fragment>
	)
}

export default MicroEdit
