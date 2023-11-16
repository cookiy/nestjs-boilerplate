import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Empty from '@/assets/images/empty.png'
import './style.less'

type ListEmptyProps = {}

const EmptyPage: React.FC<ListEmptyProps> = () => {
	return (
		<div className="host-list-empty">
			<div className="host-list-empty-image">
				<img src={Empty} alt="" />
			</div>
			<div className="host-list-empty-content">
				<div>抱歉，暂无没有发现</div>
				<div>
					<Link to="/micro/create">
						<Button type="primary">申请入驻</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default EmptyPage
