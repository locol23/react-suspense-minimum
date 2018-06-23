import { createCache, createResource } from 'simple-cache-provider'

const cache = createCache()

const wait = ms => new Promise(r => setTimeout(r, ms))

const callApi = text => new Promise(r => r(text))

const dataResource = createResource(([text, waitMs]) => {
  return Promise.all([callApi(text), wait(waitMs)])
}, ([text]) => text)

const getData = (text, waitMs) => dataResource.read(cache, [text, waitMs])

export default getData
