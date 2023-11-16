import React, { useEffect, useState, useCallback } from 'react'
import { Link } from "react-router-dom";
import { Button, Input, Row, Col, Table, Divider, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { IHost } from '@/model'
import Edit from '../components/Edit'
import service from '@/pages/category/service'

const { Column } = Table

const categoryList: React.FC = () => {
	// 查询参数
	const [params, setParams] = useState<IParams>({
		page: 1,
		limit: 20
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<IHost[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)
	// 编辑模态窗是否显示
	const [editVisible, setEditVisible] = useState(false)
	// edit category id
	const [cateId, setCateId] = useState<number>(0)

	const getList = useCallback(async () => {
		setLoading(true)
		const res = await service.getList(params)
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [params])

	useEffect(() => {
		getList()
	}, [getList])

	// 搜索
	const handleSearch = (keyword: string) => {
		setParams(state => ({ ...state, keyword }))
	}

	const handlePagination = (page: number, limit?: number) => {
		setParams(state => ({ ...state, page, limit: limit! }))
	}

	// 新增或编辑
	const handleEdit = (id: number) => {
		setEditVisible(true)
		setCateId(id)
	}
	// 取消
	const handleClose = () => {
		setEditVisible(false)
	}

	return (
		<div className="page-user">
			<Row justify="space-between">
				<Col>
					<Button.Group>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleEdit.bind(null, 0)}>
							add category
						</Button>
					</Button.Group>
				</Col>

				<Col>
					<Input.Search placeholder="请输入查询关键词" onSearch={handleSearch} enterButton={true} />
				</Col>
			</Row>
			<Divider />
			<Table<IHost>
				dataSource={list}
				rowKey="id"
				loading={loading}
				pagination={{
					total,
					showQuickJumper: true,
					showSizeChanger: true,
					showTotal: total => `共${total}个记录`,
					onChange: handlePagination
				}}
			>
				<Column title="id" dataIndex="id" />
				<Column
					title="name"
					dataIndex="name"
					render={(value, record) => <Link to={`/category/list/${record.id}`}>{value}</Link>}
				/>
				<Column
					title="创建时间"
					dataIndex="createdAt"
					render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
				/>
				<Column<IHost>
					title="操作"
					dataIndex="operate"
					width={140}
					render={(value, record) => (
						<div>
							<Button type="link" size="small" onClick={handleEdit.bind(null, record.id)}>
								编辑
							</Button>
							<Divider type="vertical" />
							<Popconfirm title="确定删除这条数据吗？" onConfirm={handleEdit.bind(null, record)}>
								<Button type="link" size="small" danger={true}>
									删除
								</Button>
							</Popconfirm>
						</div>
					)}
				/>
			</Table>
			<Edit visible={editVisible} id={cateId} onClose={handleClose} onReload={getList} />
		</div>
	)
}

export default React.memo(categoryList)
