import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import common from './modules/common'
import notice from './modules/notice'
import system from './modules/system/index'

export function setupProdMockServer() {
	createProdMockServer([...common, ...notice, ...system])
}
