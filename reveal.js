import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/dracula.css'

import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js'

const url = new URL(document.URL)
const slidesFolder = url.searchParams.get('p') || 'intro'
const markdownFilename = './slides/' + slidesFolder + '/slides.md'

console.log(markdownFilename)

fetch(markdownFilename)
  .then((r) => r.text())
  .then((markdownContents) => {

    document.querySelector('.slides').innerHTML =
      '<section data-markdown><textarea data-template>' +
      markdownContents +
      '</textarea></section>'

    const deck = new Reveal({
      plugins: [Markdown, RevealHighlight]
    })

    deck.initialize({
      width: 1280,
      height: 720,
      slideNumber: true,
      embedded: false,
    })
  })