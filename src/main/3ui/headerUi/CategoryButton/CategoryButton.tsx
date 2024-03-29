import {FC, memo, useRef} from 'react'
import style from './styles/CategoryButton.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { vectorDownV } from './styles/variants'
import { getSpringTransition } from '@/helpers/animations'
import Image from 'next/image'
import { vectorDownDarkIcon, vectorDownIcon } from '@/helpers/importIcons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCatalogCategoryIndexInHeader } from '@/store/reducers/header/catalog'
import { handleSearchMenu } from "@/store/reducers/header/search";

interface CategoryButtonI {
	title: string | undefined
	index: number
}

const CategoryButton: FC<CategoryButtonI> = props => {
	const ref = useRef(null)
	const theme = useAppSelector(state => state.theme.isDarkTheme)
	const indexOfCurrentCategoryInHeader = useAppSelector(
		state => state.catalog.indexOfCurrentCategoryInHeader
	)

	const dispatch = useAppDispatch()
	const closeMenu = () => dispatch(setCatalogCategoryIndexInHeader(-1))

	// useOnClickOutside(ref, () => closeMenu())

	return (
		<button
			onKeyDown={e => {
				if (e.key === 'Escape') {
					closeMenu()
				}
			}}
			ref={ref}
			onClick={() => {
				if (props.index === indexOfCurrentCategoryInHeader) {
					closeMenu()
					dispatch(handleSearchMenu(false))
				} else {
					dispatch(setCatalogCategoryIndexInHeader(props.index))
					dispatch(handleSearchMenu(false))
				}
			}}
			className={style.categoryButton}>
			{props.title}
			<motion.div
				variants={vectorDownV}
				animate={indexOfCurrentCategoryInHeader === props.index ? 'on' : 'off'}
				transition={getSpringTransition(30, 185)}
				className={style.iconWrapper}>
				{!theme && (
					<Image
						className={style.icon}
						src={vectorDownIcon}
						alt={'vectorDownIcon'}
					/>
				)}
				{theme && (
					<Image
						className={style.icon}
						src={vectorDownDarkIcon}
						alt={'vectorDownIcon'}
					/>
				)}
			</motion.div>
		</button>
	)
}

CategoryButton.displayName = 'CategoryButton'
export default memo(CategoryButton)
