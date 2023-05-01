import React, { FC, memo } from 'react'

import styles from './FilledCart.module.css'

interface OrderItemProps {
	name: string
	value: string
}

const OrderItem: FC<OrderItemProps> = props => {
	return (
		<div className={styles.specificsItem}>
			<p className={styles.specificsItemName}>{props.name}:</p>
			<p
				className={`${styles.specificsItemValue} ${
					props.name === 'Доставка' && styles.specificsItemDelivery
				}`}>
				{props.value} {props.name !== 'Доставка' && '₽'}
			</p>
		</div>
	)
}

export default memo(OrderItem)
