import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { Button, Popconfirm, Table, message, Switch, Divider, Drawer, Descriptions } from 'antd'
import { UserBaseInfo } from '@/model'
import service from '@/pages/user/service'
import '@/pages/user/style.less'

const { Column } = Table

const UserList: React.FC = () => {
	const [visible, setVisible] = useState(false)
	const [userInfo, setUserInfo] = useState()
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
	const showUserDetails = async (uId: string) => {
		const res = await service.getDetail(uId)
		setUserInfo(res)
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
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
							<Button type="link" size="small" onClick={() => showUserDetails(record.uId)}>
								查看
							</Button>
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
			<Drawer size="large" placement="right" onClose={onClose} visible={visible}>
				<Descriptions bordered size="small">
					<Descriptions.Item label="name" span={1}>
						{userInfo?.username}
					</Descriptions.Item>
					<Descriptions.Item label="email" span={1}>
						{userInfo?.email}
					</Descriptions.Item>
				</Descriptions>
			</Drawer>
		</div>
	)
}

export default React.memo(UserList)
