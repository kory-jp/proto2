import React from 'react'
import Header from '../organisms/layout/Header';

export const DefaultLayout = (props)=> {
  const {children} = props;
  return(
    <Header>
      {children}
    </Header>
  )
}

export default DefaultLayout;