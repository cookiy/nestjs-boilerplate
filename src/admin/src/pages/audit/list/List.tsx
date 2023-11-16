import React, { useEffect, useState, useCallback } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { IHost } from '@/model'
import service, { IParams } from '@/pages/audit/service'

const { Column } = Table

const AuditList: React.FC = () => {
	// 查询参数
	const [params, setParams] = useState<IParams>({
		pageNumber: 1,
		pageSize: 20
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<IHost[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)

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

	const handlePagination = (pageNumber: number, pageSize?: number) => {
		setParams(state => ({ ...state, pageNumber, pageSize: pageSize! }))
	}

	return (
		<div className="page-user">
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
				<Column
					title="序号"
					dataIndex="number"
					width={80}
					render={(value, record, index) => (params.pageNumber - 1) * params.pageSize + index + 1}
				/>
				<Column title="描述" dataIndex="description" />
				<Column
					title="创建时间"
					dataIndex="createTime"
					render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
				/>
				<Column title="创建人" dataIndex="operatorName" />
			</Table>
		</div>
	)
}

export default React.memo(AuditList)
