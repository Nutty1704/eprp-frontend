import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'

const ToolTip = ({
  children,
  text, className,
  side = 'bottom',
  align = 'center',
  textClassName, ...props
}) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className={className}>
                {children}
            </TooltipTrigger>
            
            <TooltipContent side={side} align={align} className='inter-regular bg-gray-100 text-foreground shadow-lg' {...props}>
                <p className={textClassName}>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip