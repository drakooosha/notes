import { InlineLoading } from '@carbon/react'
import { useState } from 'react';

const WithLoadingDelay = (Component, props) => {
  const [status, setStatus] = useState('active')

  setTimeout(() => {
    setStatus('finished')
  }, 2000);

  return (
    <>
      {status === 'active' ? <InlineLoading /> : <Component {...props} />}
    </>
  )
}

export default WithLoadingDelay;