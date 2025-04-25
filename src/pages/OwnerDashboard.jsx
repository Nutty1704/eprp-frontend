import { useEffect } from "react"; 
import { toast } from "sonner"; 
import { useGetMyBusinesses } from "@/src/lib/api/MyBusinessApi"; // Adjust the path as necessary
import BusinessCard from "@/src/components/admin/BusinessCard";
import AddBusinessDialog from "@/src/components/admin/AddBusinessDialog" 
import { Button } from "@/components/ui/button";

const OwnerDashboard = () => {
    const { businesses, isLoading, error, refetch } = useGetMyBusinesses();

    // Show a toast notification if there's an error loading
    useEffect(() => {
        if (error) {
            toast.error(`Failed to load businesses: ${error}`);
        }
    }, [error]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Businesses
                </h1>
                <AddBusinessDialog onSuccess={refetch} />
            </div>
            {isLoading ? (
                <div className="text-center py-10">
                    <div className="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading your businesses...</p>
                </div>
            ) : error ? (
                <div className="text-center py-10 px-6 border border-dashed border-red-300 rounded-lg bg-red-50">
                    <h3 className="text-lg font-medium text-red-800">Failed to Load Businesses</h3>
                     <p className="text-red-600 mt-2 mb-4">
                         {error || "An unexpected error occurred. Please try refreshing the page."}
                     </p>
                     <Button onClick={refetch} variant="outline">Try Again</Button>
                </div>
            // Use businesses array from the hook
            ) : businesses.length === 0 ? (
                 <div className="text-center py-10 px-6 border border-dashed rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800">No Businesses Found</h3>
                     <p className="text-gray-500 mt-2 mb-4">
                        You haven&apos;t added any businesses yet. Click the button below to get started!
                     </p>
                     <AddBusinessDialog onSuccess={refetch} triggerText="Add Your First Business"/>
                </div>
            ) : (
                <div className="space-y-4">
                    {businesses.map((biz) => (
                        <BusinessCard
                            key={biz._id}
                            name={biz.name}
                            location={biz.address} 
                            avgRating={biz.rating}  
                            imageUrl={biz.imageUrl}
                            description={biz.description}
                            business={biz}
                            onDataChange={refetch}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;