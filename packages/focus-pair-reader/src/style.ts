import { css } from 'lit'

export default css`
#target-wrapper {
	height: 100%;
	width: 100%;
}

#target-dialog {
	height: 100%;
	max-height: 100%;
	width: 100%;
	max-width: 100%;
	border: none;
	margin: 0;
	padding: 0;
}

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

.container {
  position: relative;
}

.transitions {
  transition: color 200ms, background-color 200ms;
}

.fill-box {
	margin: 0;
	padding: 0;
	background-color: transparent;
	border: none;
	cursor: pointer;
	height: 45px;
	width: 45px;
	user-select: none;
}

.radius {
	border-radius: 50%;
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45px;
	width: 45px;
	max-height: 45px;
	max-width: 45px;
}

.floating {
	margin: 1rem;
	position: absolute;
	top: 0;
	right: 0;
}
`
