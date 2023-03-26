import { productI } from '@/interfaces/product'
import { getRandom } from '@/helpers/commonFunctions'

const arrayOfProducts1: productI[] = []

for (let i = 0; i < 25; i++) {
	if (i % 2) {
		arrayOfProducts1.push({
			id: `${Math.random()}`,
			title: 'INDUSTRIAL',
			slug: 'industrial',
			categoryId: 'Диван',
			price: '214 300 ₽',
			images: [
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
			],
			properties: [],
		})
	} else {
		arrayOfProducts1.push({
			id: `${Math.random()}`,
			title: 'OKSITANIA',
			slug: 'oksitania',
			categoryId: 'Кровать',
			price: '147 000 ₽',
			images: [
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
				{
				imageURL: `https://random.imagecdn.app/${getRandom(
					400,
					600
				)}/${getRandom(600, 1000)}`,
					color: 'gray',
				},
			],
			properties: [],
		})
	}
}

export const arrayOfProducts = arrayOfProducts1
