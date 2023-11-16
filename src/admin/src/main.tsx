import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from '@/App'
import '@/assets/styles/app.less'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
	<ConfigProvider locale={zhCN}>
		<App />
	</ConfigProvider>
)
