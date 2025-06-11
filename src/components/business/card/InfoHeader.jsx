import React from 'react'

const InfoHeader = ({ cuisines, className }) => {
  return (
      <span className={className}>
        {cuisines.reduce((acc, cuisine) => acc + ' • ' + cuisine)}
      </span>
  )
}

export default InfoHeader
