import React, { memo } from 'react'
import Header from '../organisms/layout/Header';

export const DefaultLayout = memo((props)=> {
  const {children} = props;
  return(
    <Header>
      {children}
    </Header>
  )
})

export default DefaultLayout;