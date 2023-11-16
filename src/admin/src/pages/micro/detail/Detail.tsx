/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import service from '@/pages/micro/service'
import { MicroBaseInfo } from '@/model'
import '@/pages/micro/style.less'

const MicroDetail: React.FC = () => {
	const history = useHistory()
	const routeParams: any = useParams()
	const mid: string = routeParams.id
	const [detail, setDetail] = useState<MicroBaseInfo>()

	const getDetail = useCallback(async () => {
		const res = await service.getDetail(mid)
		setDetail(res)
	}, [mid])

	useEffect(() => {
		getDetail()
	}, [getDetail])

	return (
		<div className="page-detail">
			{detail && (
				<div>
					<PageHeader
						className="site-page-header-responsive"
						onBack={() => history.replace('/micro/list')}
						title={detail.name}
						subTitle={detail.description}
						extra={[
							<Button key={1} type="primary" onClick={() => history.push(`/micro/edit/${mid}`)}>
								编辑
							</Button>,
							<Button key={2} onClick={() => history.push(`/edition/list/${mid}`)}>
								版本历史
							</Button>
						]}
					>
						<header>
							<Descriptions size="small" bordered>
								<Descriptions.Item label="id" span={3}>
									{detail.mId}
								</Descriptions.Item>
								<Descriptions.Item label="name">{detail.name}</Descriptions.Item>
								<Descriptions.Item label="rootPath">{detail.name}</Descriptions.Item>
								<Descriptions.Item label="type">{detail.type}</Descriptions.Item>
								<Descriptions.Item label="creat user">{detail.createOperatorName}</Descriptions.Item>
								<Descriptions.Item label="creat time">{detail.createTime}</Descriptions.Item>
							</Descriptions>
						</header>
					</PageHeader>
				</div>
			)}
		</div>
	)
}

export default MicroDetail
