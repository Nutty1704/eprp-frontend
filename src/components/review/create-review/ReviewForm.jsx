import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { reviewSchema, MAX_IMAGES, MAX_CHARACTERS_TEXT, MIN_CHARACTERS_TEXT } from '@/src/lib/review/schema';
import StarForm from '@/src/components/form/StarForm';
import UploadImages from '@/src/components/form/UploadImages';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, DollarSign, Text, Upload } from 'lucide-react';
import { reviewIcons } from '@/src/config/Icons.jsx';
import { createReview } from '@/src/lib/api/review';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import TextProgressBadge from '../../ui/TextProgressBadge';

const labelIconStyle = {
    class: 'h-4 w-4 text-primary',
    strokeWidth: 3,
};

const priceRanges = ['$10-$20', '$20-$40', '$40-$60', '$60+'];

const ReviewForm = ({ business, onSuccess }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            foodRating: 0,
            ambienceRating: 0,
            serviceRating: 0,
            reviewTitle: '',
            reviewText: '',
            priceRange: '',
            images: [],
        },
    });

    const images = watch('images');
    const reviewText = watch('reviewText');

    const onSubmit = async (formData) => {
        const { success, error, data, message } = await createReview(formData, business._id);

        if (error || !success) {
            toast.error(message, { position: 'top-center' });
            return;
        }

        console.log("Successfully created review:", data);

        reset();
        onSuccess(formData); // call the onSuccess callback
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center inter-regular">
            <h2 className="text-3xl mb-2 rubik-medium">{business.name}</h2>
            <div className="w-full flex flex-col sm:flex-row gap-3">
                <div className="sm:w-1/2">
                    {['food', 'ambience', 'service'].map((field) => (
                        <div key={field} className="mb-4 space-y-1.5">
                            <label className="font-medium capitalize flex items-center">
                                <span className="mr-1">{reviewIcons[field]}</span> {field} Rating
                            </label>
                            <StarForm
                                size={22}
                                onChange={(value) => setValue(`${field}Rating`, value)}
                                error={errors[`${field}Rating`]}
                                disabled={isSubmitting}
                            />
                        </div>
                    ))}
                </div>
                <div className="rounded-md sm:w-1/2 space-y-3">
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Upload className={labelIconStyle.class} strokeWidth={labelIconStyle.strokeWidth} />
                            <span className="text-md inter-medium">Upload Images</span>
                        </div>
                        <span className="text-gray-400 text-xs">{images.length} / {MAX_IMAGES}</span>
                    </div>
                    <UploadImages disabled={isSubmitting} MAX_IMAGES={MAX_IMAGES} onChange={(files) => setValue('images', files)} />
                </div>
            </div>
            <div className="w-full flex flex-col gap-1.5">
                <label className="inter-medium flex items-center gap-2">
                    <DollarSign className={labelIconStyle.class} strokeWidth={labelIconStyle.strokeWidth} />
                    Price Range
                    {errors.priceRange && (
                        <span className="text-destructive text-xs">{errors.priceRange.message}</span>
                    )}
                </label>
                <DropdownMenu>
                    <DropdownMenuTrigger disabled={isSubmitting} asChild>
                        <Button variant="outline" className="w-3/4 md:w-2/5 justify-between">
                            {watch('priceRange') || 'Select Price Range'}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {priceRanges.map((range) => (
                            <DropdownMenuItem
                                key={range}
                                onClick={() => setValue('priceRange', range)}
                                className="cursor-pointer"
                            >
                                {range}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Review Title */}
            <div className="w-full flex flex-col gap-1.5">
                <label className="inter-medium flex items-center gap-2">
                    <Text className={labelIconStyle.class} strokeWidth={labelIconStyle.strokeWidth} />
                    Review Title
                    {errors.reviewTitle && (
                        <span className="text-destructive text-xs">{errors.reviewTitle.message}</span>
                    )}
                </label>
                <Input
                    {...register('reviewTitle')}
                    placeholder="Enter review title"
                    disabled={isSubmitting}
                />
            </div>

            {/* Review Text */}
            <div className="w-full">
                <label className="inter-medium flex items-center justify-between mb-1">
                    <div className='flex items-center gap-2'>
                        <Text className={labelIconStyle.class} strokeWidth={labelIconStyle.strokeWidth} />
                        Review
                    </div>
                    <TextProgressBadge
                        currentLength={reviewText.length}
                        maxLength={MAX_CHARACTERS_TEXT}
                        minLength={MIN_CHARACTERS_TEXT}
                    />
                </label>
                <textarea
                    {...register('reviewText')}
                    placeholder="Write your review here..."
                    className="w-full p-2 min-h-24 border border-gray-300 rounded-sm"
                    disabled={isSubmitting}
                />
                {errors.reviewText && <p className="text-destructive text-xs font-medium">{errors.reviewText.message}</p>}
            </div>
            <Button type="submit" className="w-3/5 py-2 mt-5" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Post Review'}
            </Button>
        </form>
    );
};

export default ReviewForm;