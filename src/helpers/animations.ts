import { EasingDefinition, Transition, Variants } from 'framer-motion'

export const getCommonAnimation = (
	initial: string = 'off',
	animate: string = 'on',
	exit: string = 'off'
) => {
	return {
		initial: initial,
		animate: animate,
		exit: exit,
	}
}

export const getSpringTransition = (
	damping: number = 7,
	stiffness: number = 40,
	restDelta: number = 0.1
): Transition => {
	return {
		damping,
		stiffness,
		restDelta,
		type: 'spring',
	}
}

export const getEaseAnimation = (
	duration: number = .25,
	delay: number = 0,
	type: EasingDefinition = 'easeInOut',
): Transition => {
	return {
		duration,
		delay,
		ease: type,
	}
}

export const inViewAnimationV: Variants = {
	on: {
		opacity: 1,
	},
	off: {
		opacity: 0,
	},
}

export const inViewAnimation = {
	variants: inViewAnimationV,
	transition: getSpringTransition(10, 60),
	initial: 'off',
	whileInView: 'on',
}
