import { Dispatch, FC, memo, SetStateAction } from 'react'
import { productI } from '@/interfaces/product'
import style from '@/main/2components/Product/styles/Product.module.scss'
import CircleButton from '@/main/3ui/CircleButton/CircleButton'
import { cartActiveIcon, cartHoverIcon, cartIcon, downloadIcon, heartDarkIcon, scoreIcon } from '@/helpers/importIcons'
import Image from 'next/image'
import Link from 'next/link'

interface ImageLayoutI {
	isActive: boolean
	handleActive: Dispatch<SetStateAction<boolean>>
	setCurrentImage: Dispatch<SetStateAction<number>>
	handleIsLoaded: Dispatch<SetStateAction<boolean>>
	product: productI
	currentImage: number
}

const ImageLayout: FC<ImageLayoutI> = props => {
	const handleImageLeft = () => {
		if (props.currentImage > 0) {
			props.setCurrentImage(prev => prev - 1)
		} else {
			props.setCurrentImage(props.product.images.length - 1)
		}
		props.handleIsLoaded(false)
	}

	const handleImageRight = () => {
		if (
			props.currentImage <
			props.product.images.length - 1
		) {
			props.setCurrentImage(prev => prev + 1)
		} else {
			props.setCurrentImage(0)
		}
		props.handleIsLoaded(false)
	}

	return (
		<div className={style.imageLayout}>
			<CircleButton
				className={style.cartButton}
				icon={cartIcon}
				hoverIcon={cartHoverIcon}
				activeIcon={cartActiveIcon}
				isActive={props.isActive}
				handleActive={props.handleActive}
			/>
			{props.product.images.length ? (
				<>
					<button
						onClick={() => handleImageLeft()}
						className={style.layoutLeftButton}
					/>
					<button
						onClick={() => handleImageRight()}
						className={style.rightLeftButton}
					/>
				</>
			) : null}
			<button className={style.heartButton}>
				<Image src={heartDarkIcon} alt={'heartDarkIcon'} />
			</button>
			<Link className={style.model} href={'#'}>
				<span className={style.modelText}>3D</span>
				<Image src={downloadIcon} alt={'downloadIcon'} />
			</Link>
			<div className={style.scores}>
				<Image src={scoreIcon} alt={'scoreIcon'} />
				<span className={style.scoreText}>+12</span>
			</div>
			<div className={style.pagination}>
				{props.product.images.map((value, index) => {
					return (
						<div
							key={index}
							style={
								props.currentImage === index
									? {
										background: 'var(--colorBackground)',
									}
									: {}
							}
							onClick={() => {
								props.setCurrentImage(index)
								props.handleIsLoaded(false)
							}}
							className={style.paginationDot}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default memo(ImageLayout)