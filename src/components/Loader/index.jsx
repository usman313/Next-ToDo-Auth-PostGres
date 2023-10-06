'use client'
import { RotatingLines } from 'react-loader-spinner';

function Loader({
    color='#002B5B',
    width='100',
    strokeWidth='5',
    visible,
    ...props
}) {
    return (
        <RotatingLines
            strokeColor = {color}
            width={width}
            strokeWidth={strokeWidth}
            animationDuration='0.75'
            visible={visible}
            {...props}
        />
    )
}

export default Loader;