import { useEffect } from 'react'
import { NextPage } from 'next'
import EmptyCart from '@/main/2components/EmptyCart/EmptyCart'
import FilledCart from '@/main/2components/FilledCart/FilledCart'
import { setCartProducts } from '@/store/reducers/cart/cart'
import { useSelector, useDispatch } from 'react-redux'

const Cart: NextPage = () => {
	const dispatch = useDispatch()
	const cart = useSelector((state: any) => state.cart)

	const some = 5

	useEffect(() => {
		const userCart = localStorage.getItem('cart')
		if (userCart) {
			const productsIds: number[] = JSON.parse(userCart).products
			const productsData: any = []
			console.log(productsIds)
			productsIds.forEach(productId => {
				fetch(`https://api.kalibroom.ru/api/products/${productId}`)
					.then(response => response.json())
					.then(data => {
						productsData.push(data)
						console.log(data)
						if (productsData.length === productsIds.length) {
							dispatch(setCartProducts(productsData))
						}
					})
					.catch(error => {
						console.log(error)
					})
			})
		}
	}, [])

	return (
		<>
			{cart.products.length > 0 ? (
				<FilledCart products={cart.products} />
			) : (
				<EmptyCart />
			)}
		</>
	)
}

export default Cart
