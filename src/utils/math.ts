/**
 * 获取指定整数范围内的随机整数
 * @param {number} start - 开始范围
 * @param {number} end - 结束范围 */
export const getRandomInterger = (start = 0, end: number): number => {
	const range = end - start
	const random = Math.floor(Math.random() * range + start)
	return random
}

/**
 * @desc 获取随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export const randomNum = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max + 1 - min))
}

/** @desc 获取最大值 */
export const max = (arr: number[]) => {
	return Math.max.apply(null, arr)
}

/** @desc 获取最小值 */
export const min = (arr: number[]) => {
	return Math.min.apply(null, arr)
}

/** @desc 求和 */
export const sum = (arr: number[]) => {
	return arr.reduce((pre, cur) => pre + cur)
}

/** @desc 获取平均值 */
export const average = (arr: number[]) => {
	return sum(arr) / arr.length
}

/**
 * @desc 判断是否是奇数
 * @param {number} num 数字
 */
export const isOdd = (num: number) => {
	return num % 2 !== 0
}

/**
 * @desc 判断是否是偶数
 * @param {number} num 数字
 */
export const isEven = (num: number) => {
	return !isOdd(num)
}
