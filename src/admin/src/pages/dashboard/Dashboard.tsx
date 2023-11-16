import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Card, Tabs, Space, List, Tooltip, message, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { HostBaseInfo, MicroBaseInfo } from '@/model'
import service from './service'
import './style.less'
const { Dragger } = Upload;

const { Search } = Input
const { Meta } = Card

const { TabPane } = Tabs
const props = {
	name: 'file',
	multiple: true,
	action: 'http://localhost:8899/api/upload/file',
	onChange(info) {
		const { status } = info.file
		if (status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`)
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files)
	}
}
const Dashboard: React.FC = () => {
	const history = useHistory()
	const [hostList, setHosts] = useState<HostBaseInfo[]>([])
	const [microList, setMicros] = useState<MicroBaseInfo[]>([])
	const onSearch = async value => {
		console.log(value)
		const res: any = await service.search(value)
		const { host, micro } = res
		setHosts(host)
		setMicros(micro)
	}
	return (
		<div className="page-search">
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
					files.
				</p>
			</Dragger>
			<div className="page-search-header">
				<Search placeholder="input search text" onSearch={onSearch} enterButton />
			</div>
			{(hostList.length > 0 || microList.length > 0) && (
				<div className="page-search-content">
					<div className="page-search-content-item">
						<Tabs defaultActiveKey="1">
							<TabPane tab="Host" key="1">
								<List
									grid={{ gutter: 16, column: 4 }}
									dataSource={hostList}
									renderItem={(item, index) => (
										<List.Item>
											<Tooltip title={item.name}>
												<Card
													key={index}
													title={item.name}
													hoverable
													onClick={() => history.push(`/host/detail/${item.hId}`)}
												>
													<Space direction="vertical">
														<Meta title={item.name} description={item.description} />
														<span>责任人: {item.createOperatorName}</span>
													</Space>
												</Card>
											</Tooltip>
										</List.Item>
									)}
								/>
							</TabPane>
							<TabPane tab="Micro" key="2">
								<List
									grid={{ gutter: 16, column: 4 }}
									dataSource={microList}
									renderItem={(item, index) => (
										<List.Item>
											<Tooltip title={item.name}>
												<Card
													key={index}
													title={item.name}
													hoverable
													onClick={() => history.push(`/edition/list/${item.mId}`)}
												>
													<Space direction="vertical">
														<Meta description={item.description} />
														<span>责任人: {item.createOperatorName}</span>
													</Space>
												</Card>
											</Tooltip>
										</List.Item>
									)}
								/>
							</TabPane>
						</Tabs>
					</div>
				</div>
			)}
		</div>
	)
}

export default Dashboard
