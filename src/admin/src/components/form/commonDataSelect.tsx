import React from 'react'
import { Select, SelectProps } from 'antd'
import { useCommonData } from '@/hooks/useCommonData'
import { GroupName } from '@/utils'

type BaseDataSelectValue = string | string[]

type BaseDataSelectProps = {
	type: GroupName
} & Omit<SelectProps<BaseDataSelectValue>, 'children'>

const CommonDataSelect: React.VFC<BaseDataSelectProps> = props => {
	const { type, ...otherProps } = props
	const options = useCommonData(type)

	return (
		<Select {...otherProps}>
			{options.map(item => (
				<Select.Option key={item.value} value={item.value}>
					{item.label}
				</Select.Option>
			))}
		</Select>
	)
}

export default React.memo(CommonDataSelect)
