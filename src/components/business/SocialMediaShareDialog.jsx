import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Share, Check } from 'lucide-react'
import SocialMediaShare from './SocialMediaShare'
import { DialogDescription } from '@radix-ui/react-dialog'

const SocialMediaShareDialog = ({ business, children }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = `http://localhost:5173/business/${business?._id}`;
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <Button variant='outline' className='flex items-center gap-2'>
                        <Share className='w-4 h-4' />
                        Share
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        <h4 className="text-3xl font-bold mt-7 mb-1 rubik-bold">
                            Share {business?.name}
                        </h4>
                    </DialogTitle>
                    <DialogDescription>
                        <p className="text-gray-600 inter-regular">
                            Share this business with your friends on social media or copy the link to share it directly!
                        </p>
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  
                    <div className="mb-8">
                        <SocialMediaShare
                            business={business}
                            iconSize={40}
                        />
                    </div>
                    
                    <div className="mt-6">
                        <p className="font-weight-400 mb-2">Or copy link:</p>
                        <div className="relative">
                            <div className="flex border border-primary rounded-md shadow-sm overflow-hidden">
                                <span className="px-3 py-2 text-gray-600 w-16 truncate flex-1 text-sm">
                                    {shareUrl}
                                </span>
                                <Button
                                    variant="ghost"
                                    onClick={handleCopyLink}
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4 text-primary" />
                                    )}
                                </Button>
                            </div>
                            {copied && (
                                <p className="text-sm text-green-600 mt-1 absolute right-0">
                                    Copied to clipboard!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SocialMediaShareDialog