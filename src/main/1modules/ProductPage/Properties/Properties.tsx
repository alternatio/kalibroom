import { FC, memo } from 'react'
import style from './Properties.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
	colorPopupHandleVisible,
	sizePopupHandleVisible,
} from '@/store/reducers/popups'
import Specification from '@/main/3ui/Specification/Specification'
import Accordion from '@/main/3ui/Accordion/Accordion'
import PropertyAll from '@/main/1modules/ProductPage/Properties/PropertyAllButton'
import PropertyName from '@/main/1modules/ProductPage/Properties/PropertyName'
import Delivery from '@/main/1modules/ProductPage/Properties/Delivery'
import ColorAndMaterial from '@/main/1modules/ProductPage/Properties/ColorAndMaterial'
import Sizes from '@/main/1modules/ProductPage/Properties/Sizes'

const Properties: FC = () => {
	const currentProduct = useAppSelector(
		state => state.productPage.currentProduct
	)

	const dispatch = useAppDispatch()

	return (
		currentProduct && (
			<div className={style.properties}>
				<div className={style.colorAndMaterial}>
					<PropertyName>Цвет и материал</PropertyName>
					<ColorAndMaterial product={currentProduct} />
					<PropertyAll onClick={() => dispatch(colorPopupHandleVisible(true))}>
						Все цвета
					</PropertyAll>
				</div>
				<div className={style.sizes}>
					<PropertyName>Размер</PropertyName>
					<Sizes product={currentProduct} />
					<PropertyAll onClick={() => dispatch(sizePopupHandleVisible(true))}>
						Все размеры
					</PropertyAll>
				</div>
				<Delivery product={currentProduct} />
				{currentProduct.properties?.length ? (
					<Accordion name={'характеристики'} className={style.specifications}>
						{currentProduct.properties.map((property, index) => {
							return (
								<Specification
									key={index}
									name={property.name}
									value={property.value}
								/>
							)
						})}
					</Accordion>
				) : null}
				{currentProduct?.showrooms && currentProduct.showrooms.length ? (
					<Accordion name={'посмотреть наличие в шоурумах'}>
						{currentProduct.showrooms.map((showroom, index) => {
							return (
								<span key={index}>
									{showroom?.location}
									{showroom?.quantity}
								</span>
							)
						})}
					</Accordion>
				) : null}
			</div>
		)
	)
}

export default memo(Properties)
