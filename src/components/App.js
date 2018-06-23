import React, { Timeout } from 'react'
import { compose, withStateHandlers, pure } from 'recompose'
import fetchApi from '../libs/fetchApi'

const AsyncText = ({ id, ms }) => {
  const data = fetchApi(id, ms)
  console.log(
    [
      `${`0${new Date().getHours()}`.slice(-2)}`,
      `${`0${new Date().getMinutes()}`.slice(-2)}`,
      `${`0${new Date().getSeconds()}`.slice(-2)}`,
    ].join(':'),
    'Rendering AsyncText Component'
  )
  return <span>{data}</span>
}

const Loader = ({ ms, fallback, children }) => {
  return (
    <Timeout ms={ms}>
      {didExpire => {
        console.log(
          [
            `${`0${new Date().getHours()}`.slice(-2)}`,
            `${`0${new Date().getMinutes()}`.slice(-2)}`,
            `${`0${new Date().getSeconds()}`.slice(-2)}`,
          ].join(':'),
          'didExpire: ',
          didExpire
        )
        return didExpire ? fallback : children
      }}
    </Timeout>
  )
}

const App = props => (
  <React.Fragment>
    <h1>React Suspense Minimum</h1>
    <div>
      {props.isLoading && (
        <React.Fragment>
          <p>Requested ID</p>
          <Loader ms={props.timeoutMs} fallback={<span>loading...</span>}>
            <AsyncText id="1234" ms={props.waitMs} />
          </Loader>
        </React.Fragment>
      )}
      <p>
        <button onClick={props.requestData}>Get ID</button>
        <button onClick={props.reset}>reset</button>
      </p>
    </div>
  </React.Fragment>
)

const Enhancer = compose(
  withStateHandlers(
    {
      waitMs: 2000,
      timeoutMs: 5000,
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
