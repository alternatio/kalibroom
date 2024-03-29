import { AnimatePresence, motion } from 'framer-motion'
import { FC, memo } from 'react'
import style from './CatalogMenu.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getCommonAnimation, getSpringTransition } from '@/helpers/animations'
import { menuV } from '@/helpers/variants'
import CatalogButton from '@/main/3ui/CategoryButton/CategoryButton'
import {
	toggleCatalogCategoryToIdeas,
	toggleCatalogCategoryToProducts,
} from '@/store/reducers/header/catalog'
import WideButton from '@/main/3ui/headerUi/WideButton/WideButton'
import {categoryI} from "@/interfaces/category";
import Link from "next/link";

interface CategoriesMenuI {
	categories: categoryI[]
}

const CatalogMenu: FC<CategoriesMenuI> = props => {
	const catalogIsOpen = useAppSelector(state => state.catalog.isOpen)
	const productsIsOpen = useAppSelector(state => state.catalog.productsIsOpen)
	const ideasIsOpen = useAppSelector(state => state.catalog.ideasIsOpen)
	const indexOfCurrentCategory = useAppSelector(
		state => state.catalog.indexOfCurrentCategory
	)
	const headerBottomPartIsVisible = useAppSelector(
		state => state.headerBottomPart.isVisible
	)
	const categories = useAppSelector(state => state.categories.categories)

	const dispatch = useAppDispatch()

	const wideButtons = [
		{
			title: 'Товары',
			active: productsIsOpen,
			onClick: async () => dispatch(toggleCatalogCategoryToProducts()),
		},
		{
			title: 'Идеи',
			active: ideasIsOpen,
			onClick: async () => dispatch(toggleCatalogCategoryToIdeas()),
		},
	]

	return (
		<AnimatePresence>
			{catalogIsOpen && (
				<motion.div
					{...getCommonAnimation()}
					variants={menuV}
					transition={getSpringTransition(10, 30)}
					className={style.menu}>
					<div className={style.nav}>
						{productsIsOpen &&
							props.categories.map((value, index) => {
								return (
									<CatalogButton
										key={index}
										index={index}
										buttonValues={value}
									/>
								)
							})}
						{/*{ideasIsOpen &&*/}
						{/*	props.categories.ideas.map((value, index) => {*/}
						{/*		return (*/}
						{/*			<CatalogButton*/}
						{/*				key={index}*/}
						{/*				index={index}*/}
						{/*				buttonValues={value}*/}
						{/*			/>*/}
						{/*		)*/}
						{/*	})}*/}
					</div>
					<main className={style.categories}>
						<div className={style.buttons}>
							{!headerBottomPartIsVisible &&
								wideButtons.map((value, index) => {
									return (
										<WideButton
											key={index}
											active={value.active}
											onClick={value.onClick}>
											{value.title}
										</WideButton>
									)
								})}
						</div>
						<div className={style.categoriesInner}>
							{/*{productsIsOpen &&*/}
							{/*	props.categories.products[indexOfCurrentCategory].blocks.map(*/}
							{/*		(block, index) => {*/}
							{/*			return (*/}
							{/*				<div key={index} className={style.block}>*/}
							{/*					<span className={style.blockTitle}>{block.title}</span>*/}
							{/*					<div className={style.links}>*/}
							{/*						{block.links.map((link, index) => {*/}
							{/*							return (*/}
							{/*								<Link*/}
							{/*									key={index}*/}
							{/*									className={style.link}*/}
							{/*									href={link.link}>*/}
							{/*									{link.title}*/}
							{/*								</Link>*/}
							{/*							)*/}
							{/*						})}*/}
							{/*					</div>*/}
							{/*				</div>*/}
							{/*			)*/}
							{/*		}*/}
							{/*	)}*/}
						</div>
					</main>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

CatalogMenu.displayName = 'CatalogMenu'
export default CatalogMenu
