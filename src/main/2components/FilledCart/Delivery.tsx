import { FC, memo, useState, useEffect } from 'react'
import styles from './FilledCart.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setDiscountValue } from '@/store/reducers/cart/discount'
interface DeliveryProps {
	price: number
}

const Delivery: FC<DeliveryProps> = props => {
	const [percents, setPercents] = useState<number[][]>([
		[0, 0],
		[3, 500],
		[5, 1000],
		[8, 2000],
		[10, 3000],
	])

	const dispatch = useDispatch()
	const products = useSelector((state: any) => state.cart.products)

	const [price, setPrice] = useState<number>(
		products.reduce((acc: number, item: any) => {
			return acc + item.price - item.price * (Number(item.discount) / 100)
		}, 0)
	)

	const discount = useSelector((state: any) => state.discount.value)

	useEffect(() => {
		setPrice(
			products.reduce((acc: number, item: any) => {
				return acc + item.price - item.price * (Number(item.discount) / 100)
			}, 0)
		)
	}, [products])

	useEffect(() => {
		percents.forEach(percent => {
			if (price >= percent[1]) {
				dispatch(setDiscountValue(percent[0]))
			}
			console.log(discount)
		})
	}, [price])

	return (
		<div className={styles.delivery}>
			<div className={styles.row}>
				<div className={styles.line}></div>
				{percents.map((percent, index) => {
					return (
						<div key={index} className={styles.rowItem}>
							<div
								className={`${styles.rowCircle} ${
									price >= percent[1] && styles.rowCircleAccent
								}`}>
								{percent[0]}%
							</div>
							<div className={styles.number}>{percent[1]} ₽</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default memo(Delivery)
