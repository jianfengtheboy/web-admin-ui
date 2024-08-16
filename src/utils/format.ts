// 姓名脱敏
export const formatName = (name: string) => {
	return name.length === 2 ? name.replace(/^(.).+$/, '$1*') : name.replace(/^(.).+(.)$/, '$1*$2')
}

// 手机号脱敏
export const formatPhone = (phone: string) => {
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * @desc 格式化电话号码
 * @demo 183-7983-6654
 */
export const formatPhoneNumber = (mobile: string, formatStr = '-') => {
	return mobile.replace(/(?=(\d{4})+$)/g, formatStr)
}

// 邮箱脱敏
export const formatEmail = (email: string) => {
	return email.replace(/(\w{3}).*(\w{0})@(.*)/, '$1***$2@$3')
}

// 身份证号脱敏
export const formatIdCard = (id: string) => {
	return id.replace(/^(.{6})(?:\w+)(.{4})$/, '$1********$2')
}

// 银行卡号脱敏
export const formatBankNum = (bank: string) => {
	return bank.replace(/^(.{6})(?:\d+)(.{4})$/, '$1******$2')
}
