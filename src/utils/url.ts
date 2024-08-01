/**
 * 获取url中的查询字符串参数
 * @param {String} url  url字符串
 */
export const getURLParams = (url: string) => {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
	)
}

// 返回项目路径
export const getNormalPath = (p: string) => {
	if (p.length === 0 || !p || p == 'undefined') {
		return p
	}
	let res = p.replace('//', '/')
	if (res[res.length - 1] === '/') {
		return res.slice(0, res.length - 1)
	}
	return res
}
