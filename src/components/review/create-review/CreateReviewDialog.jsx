import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReviewForm from './ReviewForm';
import ReviewSuccess from "./ReviewSuccess";
import { createSuccessMessages as successMessages } from '@/src/config/Review';

const MESSAGE_DURATION = 5500; // 5.5 seconds

const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * successMessages.length);
    return successMessages[randomIndex];
}

const CreateReviewDialog = ({ children, business }) => {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setOpen(false);
            setSuccess(false);
        }, MESSAGE_DURATION + 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className={`min-w-[30vw] min-h-[75vh] 2xl:min-h-[50vh] ${success && 'p-0'}`}
                closeIconClass={success && 'hidden'}
            >
                <DialogTitle className="sr-only">Write a Review</DialogTitle>
                {success ? (
                    <ReviewSuccess message={getRandomMessage()} waitDuration={MESSAGE_DURATION} />
                ) : (
                    <ReviewForm business={business} onSuccess={handleSuccess} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateReviewDialog;