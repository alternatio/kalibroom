import { FC, memo, useEffect } from 'react'
import style from './MainLeftPart.module.scss'
import Image from 'next/image'
import Skeleton from '@/main/3ui/Skeleton/Skeleton'
import {
	downloadDarkIcon,
	downloadIcon,
	increaseDarkIcon,
	increaseIcon,
	instructionDarkIcon,
	instructionIcon,
} from '@/helpers/importIcons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { mainImage } from '@/helpers/importImages'
import {
	handleGallery,
	setCurrentImageIndex,
	setCurrentImages,
} from '@/store/reducers/products/productPage'
import ImageSelector from '@/main/3ui/ImageSelector/ImageSelector'

interface MainLeftPartProps {}

const MainLeftPart: FC<MainLeftPartProps> = props => {
	const theme = useAppSelector(state => state.theme.isDarkTheme)
	const currentProduct = useAppSelector(
		state => state.productPage.currentProduct
	)
	const currentMaterial = useAppSelector(
		state => state.productPage.currentMaterial
	)
	const currentMaterialColor = useAppSelector(
		state => state.productPage.currentMaterialColor
	)
	const currentImages = useAppSelector(state => state.productPage.currentImages)
	const currentImageIndex = useAppSelector(
		state => state.productPage.currentImageIndex
	)

	const dispatch = useAppDispatch()

	const setterCurrentImageIndex = (data: number) => {
		dispatch(setCurrentImageIndex(data))
	}

	useEffect(() => {
		console.log(currentProduct?.fore_images)
	}, [currentProduct])

	useEffect(() => {
		getImages()
	}, [currentMaterial])

	const getImages = () => {
		setterCurrentImageIndex(0)
		if (currentProduct && currentProduct.fore_images && currentMaterial) {
			const images = currentProduct.fore_images.filter(
				image => image.material_id === currentMaterial.id
			)
			dispatch(setCurrentImages(images))
		}
	}

	return (
		currentProduct && (
			<div className={style.contentWithImage}>
				<div className={style.imagesSelector}>
					{currentImages?.length ? (
						currentImages.map((image, index) => {
							return (
								<ImageSelector
									key={index}
									image={image}
									currentImage={currentImageIndex}
									setCurrentImage={setterCurrentImageIndex}
									index={index}
									layoutId={'current image selector'}
								/>
							)
						})
					) : (
						<div className={style.imageSelectorButton} />
					)}
				</div>
				<div className={style.imageBlock}>
					<div className={style.currentImageWrapper}>
						<Skeleton className={style.skeleton} />
						<Image
							className={style.currentImage}
							src={
								currentImages
									? currentImages[currentImageIndex]?.url
									: mainImage
							}
							alt={'current image'}
							width={2000}
							height={2000}
							quality={90}
						/>
					</div>
					<div className={style.imageBlockButtons}>
						<button
							onClick={() => dispatch(handleGallery(true))}
							className={style.imageBlockButton}>
							<span className={style.imageBlockText}>Увеличить</span>
							{!theme && (
								<Image
									className={style.imageBlockIcon}
									src={increaseIcon}
									alt={'increaseIcon'}
								/>
							)}
							{theme && (
								<Image
									className={style.imageBlockIcon}
									src={increaseDarkIcon}
									alt={'increaseDarkIcon'}
								/>
							)}
						</button>
						<button className={style.imageBlockButton}>
							<span className={style.imageBlockText}>3D модель</span>
							{!theme && (
								<Image
									className={style.imageBlockIcon}
									src={downloadIcon}
									alt={'downloadIcon'}
								/>
							)}
							{theme && (
								<Image
									className={style.imageBlockIcon}
									src={downloadDarkIcon}
									alt={'downloadDarkIcon'}
								/>
							)}
						</button>
						<button className={style.imageBlockButton}>
							<span className={style.imageBlockText}>Инструкция по сборке</span>
							{!theme && (
								<Image
									className={style.imageBlockIcon}
									src={instructionIcon}
									alt={'instructionIcon'}
								/>
							)}
							{theme && (
								<Image
									className={style.imageBlockIcon}
									src={instructionDarkIcon}
									alt={'instructionDarkIcon'}
								/>
							)}
						</button>
					</div>
				</div>
			</div>
		)
	)
}

MainLeftPart.displayName = 'MainLeftPart'
export default memo(MainLeftPart)
