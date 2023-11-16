import React from 'react'
import cs from 'classnames'
import './style.less'

interface IInfoProps {
	className?: string
	style?: React.CSSProperties
	// 标签宽度
	labelWidth?: string | number
	// 是否显示冒号
	colon?: boolean
}

/**
 *  标签左右对齐的信息
 */

const Info: React.FC<IInfoProps> = props => {
	const { className, style, children, labelWidth = 64, colon = true } = props

	return (
		<div className={className} style={style}>
			{React.Children.map(children, (child: any) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						labelWidth: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
						colon
					} as any)
				}
				return null
			})}
		</div>
	)
}

interface IItemProps {
	className?: string
	style?: React.CSSProperties
	// 标签文字内容
	label?: string
	align?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch'
}

const Item: React.FC<IItemProps> = props => {
	const { className, style, label, align = 'center', children } = props
	// 父元素传入的props
	const labelWidth = (props as any).labelWidth
	const colon = (props as any).colon

	return (
		<div className={cs('info-item', className)} style={{ alignItems: align, ...style }}>
			<div className={'label'}>
				<div className={'text'} style={{ width: labelWidth }}>
					{label}
				</div>
				{colon && <span>:</span>}
			</div>
			{children}
		</div>
	)
}

export type InfoType = React.FC<IInfoProps> & {
	Item: React.FC<IItemProps>
}

const Wrap: InfoType = Info as any as InfoType
Wrap.Item = Item

export default Wrap
