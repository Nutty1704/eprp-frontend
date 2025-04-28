import { ArrowDownUp, Filter, Heart, MessageSquareText } from 'lucide-react'
import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import reviews from '@/test_data/reviews.json'

const ReviewDeck = ({ }) => {

    return (
        <div className='bg-primary min-h-[50vh] w-full relative mt-40 flex items-start justify-center pt-10'>
            <div
                className="absolute -top-32 left-0 w-full h-96 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/review-wave.svg')",
                }}
            />

            <div className='shadow-[0_-8px_30px_rgba(0,0,0,0.1)] w-[90%] max-w-[1400px] bg-white rounded-t-[5rem] flex flex-col items-center px-10 py-12 z-10'>

                {/* Header */}
                <div className='flex flex-col gap-8 w-full px-10'>
                    <div className='rubik-bold text-2xl lg:text-4xl flex items-center justify-center py-3 gap-8 lg:gap-32'>
                        <div className='flex items-center gap-3'>
                            <MessageSquareText className='text-primary w-5 h-5 lg:w-9 lg:h-9' />
                            Reviews
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-4 lg:pr-20 text-sm inter-medium'>
                        <div className='flex items-center gap-2 rounded-full bg-slate-200 py-1 px-4 shadow-sm'>
                            <ArrowDownUp className='w-4 h-4' />
                            Sort
                        </div>
                        <div className='flex items-center gap-2 rounded-full bg-slate-200 py-1 px-4 shadow-sm'>
                            <Filter className='w-4 h-4' />
                            Filter
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className='grid grid-col-1 lg:grid-cols-2 gap-y-4 gap-8 mt-8'>
                    {reviews.map((review) => (
                        <ReviewCard review={review} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ReviewDeck
