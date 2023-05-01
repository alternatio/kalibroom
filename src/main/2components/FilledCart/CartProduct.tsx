import React, { FC, memo, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './FilledCart.module.css'
import {
	crossIcon,
	heartIcon,
	crossDarkIcon,
	heartDarkIcon,
} from '@/helpers/importIcons'
import { setCartProducts } from '@/store/reducers/cart/cart'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import { mainImage } from '@/helpers/importImages'
import {productI} from "@/interfaces/product";

interface CartProductProps {
	product: productI
	initialCount: number
}

const CartProduct: FC<CartProductProps> = ({ product, initialCount }) => {
	const [count, setCount] = useState<number>(initialCount)

	const initialStatePrice: number | undefined =
		product.discount && product.price
			? product.price - product.price * (product.discount / 100)
			: product.price

	const [price, setPrice] = useState<number | undefined>(initialStatePrice)

	const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme)
	const cart = useAppSelector(state => state.cart)
	const dispatch = useDispatch()

	const handleClick = (operation: string) => {
		const updatedProducts = [...cart.products]

		if (operation === 'add') {
			setCount(count + 1)
			updatedProducts.push(product)
		} else {
			if (count > 1) {
				setCount(count - 1)
			}
			updatedProducts.splice(updatedProducts.indexOf(product), 1)
		}
		console.log(updatedProducts)
		dispatch(setCartProducts(updatedProducts))
	}

	const remove = () => {
		const updatedProducts = [...cart.products].filter(
			(item: any) => item.id !== product.id
		)

		let i = 0

		dispatch(setCartProducts(updatedProducts))
	}

	useEffect(() => {
		localStorage.setItem(
			'cart',
			JSON.stringify({
				products: cart.products.map((product: any) => product.id),
			})
		)
		console.log(cart, localStorage.getItem('cart'))
	}, [cart])

	return (
		<div className={styles.product}>
			<div className={styles.core}>
				<img className={styles.image} src={mainImage} alt='image' />
				<div className={styles.content}>
					<div className={styles.info}>
						<div className={styles.top}>
							<h3 className={styles.name}>{product.name}</h3>
							{product.discount && (
								<span className={styles.discount}>-{product.discount}%</span>
							)}
						</div>
						<p className={styles.category}>{product.category_id}</p>
						<p className={styles.description}>{product.description}</p>
					</div>
					<div className={styles.buttons}>
						<button className={styles.productButton} onClick={remove}>
							Удалить
							<Image src={isDarkTheme ? crossDarkIcon : crossIcon} alt={''} />
						</button>
						<button className={styles.productButton}>
							Избранное
							<Image src={isDarkTheme ? heartDarkIcon : heartIcon} alt={''} />
						</button>
					</div>
				</div>
			</div>
			<div className={styles.details}>
				<div className={styles.prices}>
					<div className={styles.general}>
						{product.discount && product.price && (
							<p className={`${styles.price} ${styles.old}`}>
								{product.price * count} ₽
							</p>
						)}
						{price ? <p className={styles.price}>{price * count} ₽</p> : null}
					</div>
					{price ? <p className={styles.thing}>{price} ₽/шт.</p> : null}
				</div>
				<div className={styles.counter}>
					<button onClick={() => handleClick('remove')}>-</button>
					<span>{count}</span>
					<button onClick={() => handleClick('add')}>+</button>
				</div>
			</div>
		</div>
	)
}

export default memo(CartProduct)
