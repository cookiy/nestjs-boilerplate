import { ConstantMng } from '@/utils'
import React from 'react'
import { GroupName } from '@/utils/constant-mng'

const DefaultFormatter = (item: any) => {
	return {
		value: item.id,
		label: item.name
	}
}

/**
 * 获取 common data 的 hooks
 * @param type commonData 的 name
 * @param formatter 转换方法
 */
export const useCommonData = <T extends (item: any) => any = typeof DefaultFormatter>(
	type: GroupName,
	formatter?: T
) => {
	return React.useMemo<ReturnType<T>[]>(() => {
		return ConstantMng.formatGroupByFunction(type, formatter ?? DefaultFormatter) as any
	}, [type])
}
