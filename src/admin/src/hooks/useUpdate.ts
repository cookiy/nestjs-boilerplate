import { useCallback, useState } from 'react'

const useUpdate = () => {
	const [, setState] = useState(0)
	return useCallback(() => setState(n => n + 1), [])
}

export default useUpdate
