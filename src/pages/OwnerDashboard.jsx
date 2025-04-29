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

	// Dummy fallback
	const fallbackBusinesses = [
		{
			_id: "1",
			name: "Mock Sushi Bar",
			location: "Clayton Campus",
			url: "https://sushibar.monash.edu",
			avgRating: 4.7,
			imageUrl:
				"https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?q=80&w=2070&auto=format&fit=crop",
			description:
				"A cozy sushi place near campus serving fresh rolls and bento boxes.",
		},
		{
			_id: "2",
			name: "Fake Pizza Place",
			location: "Caulfield Campus",
			url: "https://fakepizza.com",
			avgRating: 4.2,
			imageUrl:
				"https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
			description:
				"Your go-to spot for cheesy pizza and late-night cravings.",
		},
	];

	const displayBusinesses = error ? fallbackBusinesses : businesses;

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-screen">
			{/* Heading + Add Button */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Your businesses
				</h1>
				<AddBusinessDialog />
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
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default OwnerDashboard;