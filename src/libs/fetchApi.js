import { createCache, createResource } from 'simple-cache-provider'

const cache = createCache()

const wait = ms => new Promise(r => setTimeout(r, ms))

const callApi = id => new Promise(r => r(`Your ID is ${id}`))

const dataResource = createResource(
  ([id, waitMs]) => {
    return Promise.all([callApi(id), wait(waitMs)])
  },
  ([id]) => id
)

const getData = (id, waitMs) => dataResource.read(cache, [id, waitMs])

export default getData
