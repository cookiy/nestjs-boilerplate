import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Divider, Popconfirm, Table, message } from 'antd'
import moment from 'moment'
import { MicroBaseInfo } from '@/model'
import service, { IParams } from '@/pages/micro/service'

const { Column } = Table

const MicroList: React.FC = () => {
	const history = useHistory()
	// 查询参数
	const [params] = useState<IParams>({
		pageNumber: 1,
		pageSize: 10
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<MicroBaseInfo[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)

	const getList = useCallback(async () => {
		setLoading(true)
		let res: any
		if (history.location.pathname.includes('mine')) {
			res = await service.getMyList(params)
		} else {
			res = await service.getList(params)
		}
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [history.location.pathname, params])

	useEffect(() => {
		getList()
	}, [getList])

	// 单个删除
	const handleDeleteSingle = async (record: MicroBaseInfo) => {
		const { mId, name } = record
		try {
			await service.remove(mId)
			message.success(`成功删除“${name}”！`)
			getList()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="page-user">
			<Table<MicroBaseInfo>
				dataSource={list}
				rowKey="id"
				loading={loading}
				pagination={{
					total,
					showQuickJumper: true,
					showSizeChanger: true,
					showTotal: total => `共${total}个记录`
				}}
			>
				<Column
					title="序号"
					dataIndex="number"
					width={80}
					render={(value, record, index) => (params.pageNumber - 1) * params.pageSize + index + 1}
				/>
				<Column title="名称" dataIndex="name" />
				<Column title="类型" dataIndex="type" />
				<Column title="描述" dataIndex="description" />
				<Column
					title="创建时间"
					dataIndex="createTime"
					render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
				/>
				<Column title="创建人" dataIndex="createOperatorName" />
				<Column<MicroBaseInfo>
					title="操作"
					dataIndex="operate"
					render={(value, record) => (
						<div>
							<Button
								type="link"
								size="small"
								onClick={() => history.push(`/micro/detail/${record.mId}`)}
							>
								查看
							</Button>
							<Divider type="vertical" />
							<Button type="link" size="small" onClick={() => history.push(`/micro/edit/${record.mId}`)}>
								编辑
							</Button>
							<Divider type="vertical" />
							<Button
								type="link"
								size="small"
								onClick={() => history.push(`/edition/list/${record.mId}`)}
							>
								版本历史
							</Button>
							<Divider type="vertical" />
							<Popconfirm title="确定删除这条数据吗？" onConfirm={handleDeleteSingle.bind(null, record)}>
								<Button type="link" size="small" danger={true}>
									删除
								</Button>
							</Popconfirm>
						</div>
					)}
				/>
			</Table>
		</div>
	)
}

export default React.memo(MicroList)
