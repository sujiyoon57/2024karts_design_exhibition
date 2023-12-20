// "use client"
// import { useEffect, useState } from 'react';
import MainPage from './page/mainPage/mainPage';
import Designer from './page/designer/designer';

export default function Home() {

  return (
    <div className='layout-container'>
        <MainPage/>
        <Designer/>
    </div>
  )
}
