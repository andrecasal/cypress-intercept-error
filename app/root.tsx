import type { MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { useEffect, useRef } from 'react'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
	const htmlRef = useRef<HTMLHtmlElement>(null)

	useEffect(() => {
		if (htmlRef.current) {
			htmlRef.current.classList.add('hydrated')
		}
	}, [])

	return (
		<html ref={htmlRef} lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
