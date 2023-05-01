import { createSlice } from '@reduxjs/toolkit'

interface discountI {
	value: any
}

const initialState: discountI = {
	value: 0
}

const discount = createSlice({
	name: 'discount',
	initialState,
	reducers: {
		setDiscountValue(state: discountI, action) {
			state.value = action.payload
		}
	},
})

export const { setDiscountValue } = discount.actions
export default discount.reducer
