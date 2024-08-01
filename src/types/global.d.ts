declare global {
	interface Window {
		$apis: typeof import('@/apis')['default']
		$_: typeof import('lodash')
	}

	interface AnyObject {
		[key: string]: unknown
	}

	interface Options {
		value: unknown
		label: string
	}

	interface NodeOptions extends Options {
		children?: NodeOptions[]
	}

	type TimeRanger = [string, string]

	type Status = 'primary' | 'success' | 'warning' | 'danger' | 'info'

	type Gender = 0 | 1 | 2
}

export {}
