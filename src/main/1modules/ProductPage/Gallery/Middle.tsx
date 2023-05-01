import { FC } from 'react'
import style from './Gallery.module.scss'
import CircleOutlineButton from '@/main/3ui/CircleOutlineButton/CircleOutlineButton'
import { rightArrowDarkIcon, rightArrowIcon } from '@/helpers/importIcons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCurrentImageIndex } from '@/store/reducers/products/productPage'

const Middle: FC = () => {
	const theme = useAppSelector(state => state.theme.isDarkTheme)
	const currentImageIndex = useAppSelector(
		state => state.productPage.currentImageIndex
	)
	const currentImages = useAppSelector(state => state.productPage.currentImages)
	const dispatch = useAppDispatch()

	const prevClick = () => {
		if (currentImageIndex > 0) {
			dispatch(setCurrentImageIndex(currentImageIndex - 1))
		}
	}

	const nextClick = () => {
		if (currentImages && currentImageIndex < currentImages?.length - 1) {
			dispatch(setCurrentImageIndex(currentImageIndex + 1))
		}
	}

	return (
		<div className={style.middle}>
			<CircleOutlineButton
				onClick={prevClick}
				style={{ transform: 'rotate(180deg)' }}
				icon={theme ? rightArrowDarkIcon : rightArrowIcon}
			/>
			<CircleOutlineButton
				onClick={nextClick}
				icon={theme ? rightArrowDarkIcon : rightArrowIcon}
			/>
		</div>
	)
}

export default Middle
