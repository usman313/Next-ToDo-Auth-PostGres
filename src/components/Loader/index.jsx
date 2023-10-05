'use client'

import { Oval } from "react-loader-spinner"

function Loader({
    color='#0dbada',
    loading=false,
}) {
  return (
    <Oval
      height={80}
      width={80}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={loading}
      ariaLabel='oval-loading'
      secondaryColor={color}
      strokeWidth={2}
      strokeWidthSecondary={2}

    />
  )
}

export default Loader 