import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { Button, Popconfirm, Table, message, Switch, Divider } from 'antd'
import { UserBaseInfo } from '@/model'
import service from '@/pages/user/service'
import '@/pages/user/style.less'

const { Column } = Table

const UserList: React.FC = () => {
	// 表格当前页显示的数据
	const [list, setList] = useState<UserBaseInfo[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)

	const getUserList = useCallback(async () => {
		setLoading(true)
		const res = await service.getList()
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [])

	// 获取用户列表
	useEffect(() => {
		getUserList()
	}, [getUserList])

	const handleDeleteSingle = async (record: UserBaseInfo) => {
		const { uId, username } = record
		await service.deleteUser(uId)
		message.success(`成功删除用户“${username}”！`)
		getUserList()
	}

	return (
		<div className="page-user">
			<Table<UserBaseInfo>
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
				<Column title="姓名" dataIndex="username" />
				<Column title="邮箱" dataIndex="email" />
				<Column<UserBaseInfo>
					title="是否是管理员"
					dataIndex="is_admin"
					render={text => <Switch disabled={true} defaultChecked={text === 1} />}
				/>
				<Column<UserBaseInfo>
					title="操作"
					dataIndex="operate"
					render={(value, record) => (
						<Fragment>
							<Divider type="vertical" />
							<Popconfirm
								title="确定删除这条数据吗？"
								onConfirm={() => {
									handleDeleteSingle(record)
								}}
							>
								<Button type="link" size="small" danger={true}>
									删除
								</Button>
							</Popconfirm>
						</Fragment>
					)}
				/>
			</Table>
		</div>
	)
}

export default React.memo(UserList)
