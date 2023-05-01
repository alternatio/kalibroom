import { FC, memo } from 'react'
import Image from 'next/image'
import styles from './FilledCart.module.css'
import OrderItem from './OrderItem'
import Delivery from './Delivery'
import Button from '@/main/3ui/Buttons/Button/Button'

import { useSelector } from 'react-redux'
import {
	downloadIcon,
	copyIcon,
	downloadDarkIcon,
	copyDarkIcon,
} from '@/helpers/importIcons'
import {useAppSelector} from "@/store/hooks";

const Order: FC = () => {
	const cart = useSelector((state: any) => state.cart)
	const products = cart.products
	const price = products.reduce((acc: number, item: any) => {
		return acc + item.price - item.price * (Number(item.discount) / 100)
	}, 0)
	const discount = products.reduce((acc: number, item: any) => {
		return acc + item.price * (Number(item.discount) / 100)
	}, 0)

	const generalDiscount = useAppSelector(state => state.discount.value)
	const isDarkTheme = useSelector((state: any) => state.theme.isDarkTheme)

	return (
		<div className={styles.order}>
			<div className={styles.orderTop}>
				<button>
					Скопировать ссылку на корзину
					<Image src={isDarkTheme ? copyDarkIcon : copyIcon} alt='' />
				</button>
				<button>
					Скачать корзину в PDF
					<Image src={isDarkTheme ? downloadDarkIcon : downloadIcon} alt='' />
				</button>
			</div>
			<h3 className={styles.orderHeading}>Заказ</h3>
			<div className={styles.specifics}>
				<OrderItem name={`Товар(${products.length}шт.)`} value={price} />
				<OrderItem name={'Скидка'} value={discount} />
				{/* <OrderItem name={'Скидка на объем'} value={'400'} /> */}
			</div>
			<div className={styles.promo}>
				<input
					className={styles.promoInput}
					type='text'
					placeholder='Промокод'
				/>
				<Button type={'outline'} width={'100%'}>
					Ввести
				</Button>
			</div>
			<h3 className={styles.orderHeading}>Скидка</h3>
			<Delivery price={100000} />
			<div className={styles.specifics}>
				<OrderItem
					name={`Сумма заказа`}
					value={String(price - Math.round((price * generalDiscount) / 100))}
				/>
				<OrderItem name={'Доставка'} value={'Посчитается на следующем шаге'} />
			</div>
			<div className={styles.last}>
				<OrderItem name={'Итого'} value={'5000'} />
			</div>
			<Button type={'flat'} width={'100%'}>
				Перейти к оформлению
			</Button>
		</div>
	)
}

export default memo(Order)
