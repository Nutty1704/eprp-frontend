import React from 'react'

const SectionHeader = ({ title, subtitle}) => {
    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-2 rubik-bold">
                {title}
            </h2>
            <p className="text-center text-gray-600 mb-8 inter-regular">{subtitle}</p>
        </>
    )
}

export default SectionHeader
