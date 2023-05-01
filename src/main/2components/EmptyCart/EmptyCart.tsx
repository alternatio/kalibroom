import styles from './EmptyCart.module.css'
import Main from '@/main/3ui/Main/Main'
import Button from '@/main/3ui/Buttons/Button/Button'

const EmptyCart = () => {
	return (
		<Main>
			<div className={styles.core}>
				<div className={styles.content}>
					<h2 className={styles.heading}>Корзина</h2>
					<p className={styles.description}>Здесь ничего еще нет...</p>
				</div>
				<Button type={'flat'} width={'min(100%, 30rem)'}>
					Начать покупки
				</Button>
			</div>
		</Main>
	)
}

export default EmptyCart
