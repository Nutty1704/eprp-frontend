import React from 'react'

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-8 md:mb-10 rubik-regular">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
            </h2>
            <p className="mt-1.5 inter-regular max-w-2xl mx-auto text-base text-gray-500 sm:mt-2 sm:text-lg">
                {subtitle}
            </p>
        </div>
    )
}

export default SectionHeader
