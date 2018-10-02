import React, { Timeout } from 'react'
import { compose, withStateHandlers, pure } from 'recompose'
import { fetchData } from '../libs/fetchData'

const AsyncText = ({ id, waitMs }) => {
  const data = fetchData(id, waitMs)
  return <span>{data}</span>
}

const Loader = ({ timeOutMs, fallback, children }) => {
  return (
    <Timeout ms={timeOutMs}>
      {didExpire => (didExpire ? fallback : children)}
    </Timeout>
  )
}

const App = props => (
  <React.Fragment>
    <h1>React Suspense Minimum</h1>
    <div>
      <p>
        <button onClick={props.requestData}>Get ID</button>
        <button onClick={props.reset}>reset</button>
      </p>
      {props.isLoading && (
        <React.Fragment>
          <p>Requested ID</p>
          <Loader
            timeOutMs={props.timeOutMs}
            fallback={<span>loading...</span>}
          >
            <AsyncText id="1234" waitMs={props.waitMs} />
          </Loader>
        </React.Fragment>
      )}
    </div>
  </React.Fragment>
)

const Enhancer = compose(
  withStateHandlers(
    {
      waitMs: 10000,
      timeOutMs: 5000,
      showHello: false,
      isLoading: false,
    },
    {
      requestData: () => () => ({ isLoading: true }),
      reset: () => () => ({ isLoading: false }),
    }
  ),
  pure
)

export default Enhancer(App)
