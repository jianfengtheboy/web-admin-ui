const headerMap = {
	txt: 'data:text/plain',
	png: 'data:image/png',
	jpg: 'data:image/jpeg',
	xlsx: 'data:application/vnd.ms-excel'
}

const FileSizes = {
	k: 1024,
	m: 1048576,
	g: 1073741824,
	t: 1099511627776
}

/**
 * 将base64数据转换为Bolb
 */
export const base64toBlob = (dataURL: string, filename: string = 'file') => {
	const arr = dataURL.split(',')
	const mime = arr[0]!.match(/:(.*?);/)![1]
	const suffix = mime.split('/')[1]
	const bstr = window.atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], `${filename}.${suffix}`, {
		type: mime
	})
}

/**
 * 将Blob数据转换为base64
 */
export const blobToBase64 = (blob: Blob) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = e => {
			resolve(e.target?.result as string)
		}
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

/**
 *  下载文件。数据源是Blob对象
 */
export const downloadBlobFile = (binaryString: Blob, fileName: string) => {
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(binaryString)
	link.download = fileName
	link.click()
	//延时释放
	setTimeout(function () {
		window.URL.revokeObjectURL(link.href)
	}, 100)
}

// 数据源不是Blob
export const downloadBlobFileNew = (binaryString: Blob, fileName: string) => {
	const blob = new Blob([binaryString], { type: 'application/octet-stream' })
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	link.click()
	//延时释放
	setTimeout(function () {
		window.URL.revokeObjectURL(link.href)
	}, 100)
}

/**
 *  下载文件。数据源是base64
 */
export const downloadBase64File = (
	data: string,
	fileName: string,
	headerType?: 'txt' | 'png' | 'jpg' | 'xlsx' | 'lic'
) => {
	const link = document.createElement('a')
	const header = headerMap[headerType || ''] || ''
	link.href = header + ';base64,' + data
	link.download = fileName
	link.click()
}

/**
 *  通过文件地址下载文件
 */
export const downloadURLFile = (url: string, fileName: string) => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', url.replace(/\\/g, '/'), true)
	xhr.responseType = 'blob'
	xhr.onload = () => {
		if (xhr.status === 200) {
			downloadBlobFile(xhr.response, fileName)
		}
	}
	xhr.send()
}

/**
 *  获取文件的后缀
 */
export const getFileSuffix = (fileName: string) => {
	let suffix = ''
	const pointIndex = fileName.lastIndexOf('.')
	if (pointIndex > -1) {
		suffix = fileName.slice(pointIndex + 1)
	}
	return suffix
}

/**
 *  格式化文件大小
 */
export const formatFileSize = (fileByte: number) => {
	if (!fileByte) return ''
	const KB = FileSizes.k
	const MB = FileSizes.m
	const GB = FileSizes.g
	const TB = FileSizes.t
	const FIXED_TWO_POINT = 2
	let result = ''
	if (fileByte < KB) {
		result = '小于1KB'
	} else if (fileByte > KB && fileByte < MB) {
		result = (fileByte / KB).toFixed(FIXED_TWO_POINT) + 'KB'
	} else if (fileByte === MB) {
		result = '1M'
	} else if (fileByte > MB && fileByte < GB) {
		result = (fileByte / (KB * KB)).toFixed(FIXED_TWO_POINT) + 'MB'
	} else if (fileByte === GB) {
		result = '1GB'
	} else if (fileByte > GB && fileByte < TB) {
		result = (fileByte / (KB * KB * KB)).toFixed(FIXED_TWO_POINT) + 'GB'
	} else {
		result = '超过1TB'
	}
	return result
}

/**
 * 文件下载
 * @param {String} url 文件地址
 * @param {String} fileName  文件名称
 */
export const downloadFileByURL = (url, fileName) => {
	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.click()
}

/**
 * 根据文件地址下载文件
 * @param {*} sUrl
 */
export function downloadByUrl({
	url,
	target = '_blank',
	fileName
}: {
	url: string
	target?: '_self' | '_blank'
	fileName?: string
}): Promise<boolean> {
	// 是否同源
	const isSameHost = new URL(url).host === location.host
	return new Promise<boolean>((resolve, reject) => {
		if (isSameHost) {
			const link = document.createElement('a')
			link.href = url
			link.target = target

			if (link.download !== undefined) {
				link.download = fileName || getFileName(url)
			}

			if (document.createEvent) {
				const e = document.createEvent('MouseEvents')
				e.initEvent('click', true, true)
				link.dispatchEvent(e)
				return resolve(true)
			}

			if (!url.includes('?')) {
				url += '?download'
			}

			window.open(url, target)
			return resolve(true)
		} else {
			const canvas = document.createElement('canvas')
			const img = document.createElement('img')
			img.setAttribute('crossOrigin', 'Anonymous')
			img.src = url
			img.onload = () => {
				canvas.width = img.width
				canvas.height = img.height
				const context = canvas.getContext('2d')!
				context.drawImage(img, 0, 0, img.width, img.height)
				canvas.toBlob(blob => {
					const link = document.createElement('a')
					if (!blob) return
					link.href = window.URL.createObjectURL(blob)
					link.download = getFileName(url)
					link.click()
					URL.revokeObjectURL(link.href)
					resolve(true)
				}, 'image/jpeg')
			}
			img.onerror = e => reject(e)
		}
	})
}

/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
function getFileName(url: string) {
	const num = url.lastIndexOf('/') + 1
	let fileName = url.substring(num)
	// 把参数和文件名分割开
	fileName = decodeURI(fileName.split('?')[0])
	return fileName
}
