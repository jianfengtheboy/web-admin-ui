import { ELang } from '@/config/enum'

// 获取当前浏览器语言
export const getCurrentLanguage = () => {
	const UAlang = navigator.language
	const langCode = UAlang.indexOf('zh') !== -1 ? ELang.zh : ELang.en
	return langCode
}

// 空判断
export const isEmpty = (data: unknown) => {
	if (data === '' || data === 'undefined' || data === undefined || data === null || data === 'null') {
		return true
	}
	if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]' || JSON.stringify(data) === '[{}]') {
		return true
	}
	return false
}

/**
 * 数值录入
 * @param {String} value       输入的值
 * @param {Boolean} minus      是否允许输入负数
 * @param {Number}  decimals   保留几位小数，不传参则不对小数进行处理，0表示整数。
 */
export const inputNumber = (value: string | number, minus: boolean = true, decimals?: number) => {
	if (!value) {
		return ''
	}
	let result = String(value)
	result = result.replace(/^(\-)*\D*(\d*(?:\.\d*)?).*$/g, '$1$2')
	// 正数处理，去除负号
	if (!minus) {
		result = result.replace('-', '')
	}
	// 小数处理
	const decimalIndex = result.indexOf('.')
	if (decimalIndex > -1 && decimals !== undefined) {
		if (decimals === 0) {
			result = result.slice(0, decimalIndex + decimals)
		} else if (decimals > 0) {
			result = result.slice(0, decimalIndex + decimals + 1)
		}
	}
	return result
}

/**
 * @desc 去除空格
 * @param {string} str - 字符串
 * @param {string} pos - 去除空格的位置
 * pos="both": 去除两边空格
 * pos="left": 去除左边空格
 * pos="right": 去除右边空格
 * pos="all": 去除所有空格 */
type Pos = 'both' | 'left' | 'right' | 'all'
export const trim = (str: string, pos: Pos = 'both'): string => {
	if (pos === 'both') {
		return str.replace(/^\s+|\s+$/g, '')
	} else if (pos === 'left') {
		return str.replace(/^\s*/, '')
	} else if (pos === 'right') {
		return str.replace(/(\s*$)/g, '')
	} else if (pos === 'all') {
		return str.replace(/\s+/g, '')
	} else {
		return str
	}
}

/**
 * @desc 大小写转换
 * @param {string} str 待转换的字符串
 * @param {number} type 1:全大写 2:全小写 3:首字母大写 */
export const toCase = (str: string, type: number) => {
	switch (type) {
		case 1:
			return str.toUpperCase()
		case 2:
			return str.toLowerCase()
		case 3:
			return str[0].toUpperCase() + str.substring(1).toLowerCase()
		default:
			return str
	}
}

/**
 * @desc 将RGB转化为十六机制 */
export const rgbToHex = (r: number, g: number, b: number) => {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * @desc 获取随机十六进制颜色 */
export const randomHex = () => {
	return `#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padEnd(6, '0')}`
}

// 过滤对象中的空键值对
export const formatParams = (args: Object) => {
	return Object.entries(args).reduce((acc, [key, value]) => {
		if (![undefined, null, ''].includes(value)) {
			acc[key] = value
		}
		return acc
	}, {})
}
