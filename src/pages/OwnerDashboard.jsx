import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BusinessCard from "../components/admin/BusinessCard";
import AddBusinessDialog from "../components/admin/AddBusinessDialog";
import { useGetMyBusinesses } from "../lib/api/MyBusinessApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
	const { businesses, isLoading, error } = useGetMyBusinesses();
	const displayBusinesses = error ? [] : businesses;

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-screen">
			{/* Heading + Add Button */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Your businesses
				</h1>
        <Link to="/owner/business/new">
          <Button className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700">
            <Plus className="w-4 h-4" />
            Add Business
          </Button>
        </Link>
			</div>

			{/* Loading / Empty / List */}
			{isLoading ? (
				<p className="text-gray-600">Loading...</p>
			) : displayBusinesses.length === 0 ? (
				<p className="text-gray-500 italic">
					You have no businesses yet.
				</p>
			) : (
				<div className="space-y-4">
					{displayBusinesses.map((biz) => (
						<Link
							key={biz._id}
							to={`/owner/business/${biz._id}`}
							className="block"
						>
							<BusinessCard
								name={biz.name}
								location={biz.address}
								url={biz.url}
								avgRating={biz.rating}
								imageUrl={biz.imageUrl}
								description={biz.description}
                reviewCount={biz.review_count}
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default OwnerDashboard;
