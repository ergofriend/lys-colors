import { generateRandomPairColor } from '@lys-42/random-pair-colors'
import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from 'body-scroll-lock'
import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import bookIcon from './assets/book-open.svg?raw'
import closeBoxIcon from './assets/close-box.svg?raw'
import randomIcon from './assets/switch.svg?raw'

type Mode = 'fill' | 'modal'

@customElement('focus-pair-reader')
export class CustomComponent extends LitElement {
	@property()
	textColor: string | undefined = undefined

	@property()
	backgroundColor: string | undefined = undefined

	@property({ type: Number })
	threshold: number | undefined = 70

	@property()
	mode: Mode = 'fill'

	@property()
	target = 'target-root'

	@property({ type: Array, attribute: 'external-link' })
	externalLinks: string[] = []

	@state()
	private _theme = {
		color: '',
		backgroundColor: '',
	}

	constructor() {
		super()
		const color = generateRandomPairColor({
			textColor: this.textColor,
			backgroundColor: this.backgroundColor,
			threshold: this.threshold,
		})
		this._theme = {
			color: color.textColor,
			backgroundColor: color.backgroundColor,
		}
	}

	attributeChangedCallback(
		name: string,
		_old: string | null,
		value: string | null,
	): void {
		super.attributeChangedCallback(name, _old, value)
		if (name === 'external-link') {
			this.requestUpdate()
		}
	}

	static styles = css`
	dialog,
	::backdrop {
		opacity: 0;
		transition: opacity 200ms, display 200ms allow-discrete, overlay 200ms allow-discrete;
	}
	
	dialog[open],
	dialog[open]::backdrop {
		opacity: 1;
	}
	
	@starting-style {
		dialog[open],
		dialog[open]::backdrop {
			opacity: 0;
		}
	}

	svg {
		width: 24px;
		height: 24px;
		max-width: 24px;
		max-height: 24px;
	}
`

	private getRevertTheme() {
		return {
			color: this._theme.backgroundColor,
			backgroundColor: this._theme.color,
		}
	}

	private handleRandomColor() {
		const color = generateRandomPairColor()
		this._theme = {
			color: color.textColor,
			backgroundColor: color.backgroundColor,
		}
	}

	private handleOpenDialog() {
		const target = document.querySelector(this.target) as HTMLElement | null

		if (target) {
			const copied = target.cloneNode(true) as HTMLElement
			copied.setAttribute('part', 'target')

			const dialogWrapper = this.shadowRoot?.getElementById(
				'target-wrapper',
			) as HTMLDivElement
			dialogWrapper.children.length <= 1 && dialogWrapper.appendChild(copied)
		}

		const dialog = this.shadowRoot?.getElementById(
			'target-dialog',
		) as HTMLDialogElement
		dialog.showModal()
		disableBodyScroll(dialog)
		dialog.addEventListener('close', () => {
			enableBodyScroll(dialog)
		})
	}

	private handleCloseDialog() {
		const dialog = this.shadowRoot?.getElementById(
			'target-dialog',
		) as HTMLDialogElement
		dialog.close()
		enableBodyScroll(dialog)
	}

	disconnectedCallback() {
		clearAllBodyScrollLocks()
	}

	render() {
		switch (this.mode) {
			case 'fill':
				return html`
					<div
					part="container"
						style=${styleMap({
							...this._theme,
							...themeTransition,
							position: 'relative',
						})}
					>
					<div style=${styleMap(floatingStyle)}>
				<button
				part="random-button"
				style=${styleMap({
					...floatingStyle,
					...fillButtonStyle,
					...this.getRevertTheme(),
				})}
					@click=${() => this.handleRandomColor()}
					>
					<div style=${styleMap(centerStyle)} part="random-button-inner">
					${unsafeSVG(randomIcon)}
				</div>
					</button>
					</div>
					<slot />
					</div>
				`
			case 'modal':
				return html`
				<button @click=${() => this.handleOpenDialog()}
				
				style=${styleMap({
					...fillBoxButtonStyle,
					...this._theme,
				})}
				>
				<div style=${styleMap(centerStyle)}>
					${unsafeSVG(bookIcon)}
				</div>
				</button>
					<dialog id="target-dialog" part="target-dialog"
					style=${styleMap({
						...dialogStyle,
						...this._theme,
						...themeTransition,
					})}>
					${this.externalLinks.map(
						(link) => html`<link rel="stylesheet" href=${link} />`,
					)}
						<div id="target-wrapper" part="target-wrapper" style=${styleMap({
							...targetWrapperStyle,
							...this._theme,
							...themeTransition,
						})}>
						<div style=${styleMap(floatingStyle)}>
						<button @click=${() => this.handleRandomColor()}
						style=${styleMap({
							...fillBoxButtonStyle,
							...this.getRevertTheme(),
						})}
						>
					<div style=${styleMap(centerStyle)}>
					${unsafeSVG(randomIcon)}
				</div>
						</button>
						<button
						style=${styleMap({
							...fillBoxButtonStyle,
							...this.getRevertTheme(),
						})}
						@click=${() => this.handleCloseDialog()}>
				<div style=${styleMap(centerStyle)}>
				${unsafeSVG(closeBoxIcon)}
			</div>
			</button>
			</div>
						</div>
					</dialog>
				`
		}
	}
}

const themeTransition = {
	transition: 'color 200ms, background-color 200ms',
}

const dialogStyle = {
	height: '100%',
	maxHeight: '100%',
	width: '100%',
	maxWidth: '100%',
	border: 'none',
	margin: '0',
	padding: '0',
}

const targetWrapperStyle = {
	height: '100%',
	width: '100%',
}

const floatingStyle = {
	margin: '1rem',
	position: 'absolute',
	top: '0',
	right: '0',
}

const centerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '45px',
	width: '45px',
	maxHeight: '45px',
	maxWidth: '45px',
}

const fillButtonStyle = {
	margin: '0',
	padding: '0',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	height: '45px',
	width: '45px',
	userSelect: 'none',
	borderRadius: '50%',
}

const fillBoxButtonStyle = {
	margin: '0',
	padding: '0',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	height: '45px',
	width: '45px',
	userSelect: 'none',
}
