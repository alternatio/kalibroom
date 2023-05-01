import { combineReducers } from 'redux'

import themeReducer from '@/store/reducers/global/theme'
import catalogReducer from '@/store/reducers/header/catalog'
import headerBottomPart from '@/store/reducers/header/headerBottomPart'
import products from '@/store/reducers/products/products'
import paths from '@/store/reducers/paths'
import search from '@/store/reducers/header/search'
import popups from '@/store/reducers/popups'
import bodyOverflow from '@/store/reducers/global/bodyOverflow'
import categories from '@/store/reducers/header/categories'
import productPage from '@/store/reducers/products/productPage'
import discount from '@/store/reducers/cart/discount'
import cart from '@/store/reducers/cart/cart'

const rootReducer = combineReducers({
	theme: themeReducer,
	catalog: catalogReducer,
	headerBottomPart,
	products,
	paths,
	search,
	popups,
	bodyOverflow,
	categories,
	productPage,
	cart,
	discount,
})

export default rootReducer
