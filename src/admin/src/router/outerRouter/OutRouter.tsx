import React, { lazy, Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/base/page-loading'

const Login = lazy(() => import('@/pages/account/login/Login'))

const routes: RouteProps[] = [
	{
		path: '/account/login',
		exact: true,
		component: Login
	}
]

const OterRouter: React.FC = () => (
	<Suspense fallback={<PageLoading />}>
		<Switch>
			{routes.map((route: RouteProps) => (
				<Route key={route.path + ''} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	</Suspense>
)

export default OterRouter
