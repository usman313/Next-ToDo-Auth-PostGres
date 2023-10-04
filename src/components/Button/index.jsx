'use client'

import { Button } from 'flowbite-react';

function MyButton({
    color,
    variant=null,
    children,
    ...props
}) {
  return (
    <Button
        variant={variant}
        color={color}
        {...props}
    >
        {children}
    </Button>
  )
}

export {MyButton as Button}