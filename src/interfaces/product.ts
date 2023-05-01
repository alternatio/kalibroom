export interface productI {
	// main data
	id: number
	slug?: string
	article?: string
	name?: string

	// price and discount
	price?: number
	discount?: number

	// category
	category_id?: number
	category_name?: string

	// common
	breadcrumbs?: breadcrumbI[]
	model_3d?: string
	instruction?: string
	quantity?: number
	description?: string
	sizes?: string[]
	showrooms?: showroomI[]
	related_products?: productI[]

	// customization
	fore_images?: imageI[]
	materials?: materialI[]

	// content
	videos?: string[]
	interior_images?: string[]

	// other
	properties?: propertyI[]
	reviews?: reviewI[]
}

export interface breadcrumbI {
	slug: string
	title: string
}

export interface imageI {
	id?: number
	material_id?: number
	in_interior?: number
	product_id?: number
	url?: string
}

export interface propertyI {
	name: string
	value: string
}

export interface showroomI {
	location: string
	quantity: number
}

export interface colorI {
	id: number
	color: string
	color_name: string
	material_id: number
	product_id: number
}

export interface materialI {
	id: number
	// product_id: number
	colors: colorI[]
	type: string
	image: string
}

export interface reviewI {
	user_name: string
	avatar: string
	time_use: number
	date: string
	rate: number
	body: string
}
