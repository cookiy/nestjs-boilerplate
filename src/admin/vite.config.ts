import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

import svgr from 'vite-plugin-svgr'
const path = require('path')

const resolve = dir => path.resolve(process.cwd(), dir)

export default defineConfig({
	plugins: [reactRefresh(), svgr()],
	server: {
		port: 3008,
		open: true
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				globalVars: {
					hack: `true; @import (reference) "${resolve(
						'src/assets/styles/variable.less'
					)}";@import (reference) "${resolve('src/assets/styles/mixin.less')}";`
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve('src')
		}
	}
})
