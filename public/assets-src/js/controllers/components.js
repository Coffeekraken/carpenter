import __socketio from 'socket.io-client'
import __prism from 'prismjs'
import __htmlspecialchars from 'htmlspecialchars'
import __interactjs from 'interactjs'

// function resizeIframe(iframe) {
// 	iframe.style.height = '1px'
// 	if (iframe.contentWindow) {
// 		iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 40 + 'px';
// 	}
// }

if (document.querySelector('section.components')) {

	// resizable iframe
	[].forEach.call(document.querySelectorAll('.components__iframe-wrapper'), (item) => {
		// restore iframe width if exist in localStorage
		const restoreIframeWidth = localStorage.getItem('components-iframe-width')
		if (restoreIframeWidth) {
			item.style.width = restoreIframeWidth + 'px'
		}

		// handle the set-iframe-width elements
		[].forEach.call(item.querySelectorAll('[set-iframe-width]'), (setIframeWidthElm) => {
			setIframeWidthElm.addEventListener('click', (e) => {
				const width = e.currentTarget.getAttribute('set-iframe-width')
				item.style.width = (width) ? width + 'px' : null
				// save in local storage
				localStorage.setItem('components-iframe-width', width)
			})
		})

		// allow resizing the iframe
		__interactjs(item).resizable({
			edges: { top: false, right: true, bottom: false, left: false },
			inertia: true,
			// minimum size
			restrictSize: {
				min: { width: 100 }
			},
		}).on('resizemove', function (event) {
			event.preventDefault()
			var target = event.target
			target.style.width  = event.rect.width + 'px';
			// save in local storage
			localStorage.setItem('components-iframe-width', event.rect.width)
		})
	})

	;[].forEach.call(document.querySelectorAll('.components__iframe-wrapper iframe'), (iframe) => {
		iframe.onload = () => {
			// handle click on links inside the iframe
			iframe.contentWindow.document.body.addEventListener('click', (e) => {
				const href = e.target.getAttribute('href')
				if (href && href.match(/\components\//)) {
					e.preventDefault()
					document.location.href = href
				}
			})
		}
	})

	const io = __socketio(`${document.location.protocol}//${document.location.hostname}:${window.carpenter.port + 1}`)
	io.on('component:update', (data) => {

		// get all the references in the html
		const viewContentElm = document.querySelector('#view-content')
		const schemaJsonContentElm = document.querySelector('#schema-json-content')
		const readmeContentElm = document.querySelector('#components-readme')

		// update these elements
		if (viewContentElm) viewContentElm.innerHTML = `<code class="lang-html">${__htmlspecialchars(data.viewContent)}</code>`
		if (schemaJsonContentElm) schemaJsonContentElm.innerHTML = `<code class="lang-json">${data.schemaJsonContent}</code>`
		if (readmeContentElm) readmeContentElm.innerHTML = data.readmeContent

		let styleTags = []
		let scriptTags = []
		if (data.inject) {
			if (data.inject.styles) {
				data.inject.styles.forEach((styleUrl) => {
					styleTags.push(`<link rel="stylesheet" href="${styleUrl}" />`)
				})
			}
			if (data.inject.scripts) {
				data.inject.scripts.forEach((styleUrl) => {
					scriptTags.push(`<script src="${styleUrl}"></script>`)
				})
			}
		}

		// loop on each variants
		for (let key in data.variants) {
			const value = data.variants[key]
			const id = key.replace(/\./g,'-')

			// get the element in html
			const viewVariantElm = document.querySelector(`#view-variant-${id}`)
			const dataVariantElm = document.querySelector(`#data-variant-${id}`)

			// new iframe
			const newIframeElm = document.createElement('iframe')
			newIframeElm.setAttribute('width','100%')
			newIframeElm.setAttribute('id', viewVariantElm.id)
			newIframeElm.setAttribute('onload', 'resizeIframe(this)')
			newIframeElm.style.height = viewVariantElm.offsetHeight + 'px'

			// append it to the HTML
			viewVariantElm.parentNode.insertBefore(newIframeElm, viewVariantElm)
			// update the elements
			newIframeElm.contentWindow.document.write(`
				<html>
				<body>
					${value.view}
					${styleTags.join('')}
					${scriptTags.join('')}
					<style>body { padding: 20px; }</style>
				</body>
				</html>
			`)
			// remove the old iframe
			viewVariantElm.parentNode.removeChild(viewVariantElm)

			// update the data of the current variant
			dataVariantElm.innerHTML = `<code class="lang-js">${value.dataContent}</code>`
		}
		// relaunch prism to highlight all the code parts
		__prism.highlightAll();

	})
}
