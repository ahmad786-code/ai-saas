'use client'
import React, {useEffect} from 'react'
import {Crisp} from 'crisp-sdk-web'

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('23bd1223-b026-4edb-9285-d1ed0b479ecc')
    },[])
  return null
}

export default CrispChat