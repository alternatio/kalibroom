import { FC } from 'react'
import styles from './FilledCart.module.css'
import CartList from '@/main/2components/FilledCart/CartList'
import Order from '@/main/2components/FilledCart/Order'
import Main from '@/main/3ui/Main/Main'

interface FilledCartProps {
	products: any
}

const FilledCart: FC<FilledCartProps> = props => {
	return (
		<Main>
			<div className={styles.parts}>
				<div className={styles.part}>
					<h3 className={styles.heading}>Товары</h3>
					<CartList products={props.products} />
				</div>
				<Order />
			</div>
		</Main>
	)
}

export default FilledCart
