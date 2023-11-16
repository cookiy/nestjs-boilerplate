declare module '*.svg' {
	const ReactComponent: import('react').FunctionComponent<
		import('react').SVGProps<SVGSVGElement> & {
			title?: string | undefined
		}
	>
	export { ReactComponent }
}
