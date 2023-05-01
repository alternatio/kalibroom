import { FC, memo } from 'react'
import styles from './FilledCart.module.css'
import CartProduct from '@/main/2components/FilledCart/CartProduct'

interface CartListProps {
	products: any
}

const CartList: FC<CartListProps> = ({ products }) => {
	const productsCount = products.reduce((acc: any, product: any) => {
		const id = product.id

		if (acc[id]) {
			acc[id].count++
		} else {
			acc[id] = {
				product,
				count: 1,
			}
		}

		return acc
	}, {})

	return (
		<ul className={styles.list}>
			{Object.values(productsCount).map((item: any) => {
				return (
					<CartProduct
						key={item.product.id}
						product={item.product}
						initialCount={item.count}
					/>
				)
			})}
		</ul>
	)
}

export default memo(CartList)
