import { generateRandomPairColor } from '@ergofriend/random-pair-colors'
import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from 'body-scroll-lock'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import bookIcon from 'pixelarticons/svg/book-open.svg?raw'
import closeBoxIcon from 'pixelarticons/svg/close-box.svg?raw'
import randomIcon from 'pixelarticons/svg/switch.svg?raw'

import style from './style'

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

	static styles = [style]

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
						class="container transitions"
						style=${styleMap(this._theme)}
						>
						<div class="floating">
							<button
								part="random-button"
								class="fill-box radius floating"
								style=${styleMap(this.getRevertTheme())}
								@click=${() => this.handleRandomColor()}
								>
								<div class="center" part="random-button-inner">
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
						class="fill-box"
						style=${styleMap(this._theme)}
						>
						<div class="center">
							${unsafeSVG(bookIcon)}
						</div>
					</button>
					<dialog id="target-dialog" part="target-dialog"
						class="transitions"
						style=${styleMap(this._theme)}
						>
						${this.externalLinks.map(
							(link) => html`<link rel="stylesheet" href=${link} />`,
						)}
						<div id="target-wrapper" part="target-wrapper"
							class="transitions"
							style=${styleMap(this._theme)}
							>
							<div  class="floating">
								<button @click=${() => this.handleRandomColor()}
									class="fill-box"
									style=${styleMap(this.getRevertTheme())}
									>
									<div class="center">
										${unsafeSVG(randomIcon)}
									</div>
								</button>
								<button
									class="fill-box"
									style=${styleMap(this.getRevertTheme())}
									@click=${() => this.handleCloseDialog()}
									>
									<div class="center">
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
