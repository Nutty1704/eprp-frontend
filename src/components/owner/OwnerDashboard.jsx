// src/components/owner/OwnerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BusinessCard from "./BusinessCard";
import { getOwnerBusinesses } from "../../lib/api/owner";
import { toast } from "sonner";
import AddBusinessDialog from "./AddBusinessDialog";
import AuthDialog from "../auth/AuthDialog";

const OwnerDashboard = () => {
	const [businesses, setBusinesses] = useState([]);
	const [loading, setLoading] = useState(true);

	//   useEffect(() => {
	//     const fetchBusinesses = async () => {
	//       const res = await getOwnerBusinesses();
	//       if (res.success) {
	//         setBusinesses(res.businesses);
	//       } else {
	//         toast.error(res.message);
	//       }
	//       setLoading(false);
	//     };

	//     fetchBusinesses();
	//   }, []);

	useEffect(() => {
		// Simulate loading
		const timeout = setTimeout(() => {
			setBusinesses([
				{
					_id: "1",
					name: "Mock Sushi Bar",
					location: "Clayton Campus",
					url: "https://sushibar.monash.edu",
					avgRating: 4.7,
					imageUrl:
						"https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					description:
						"A cozy sushi place near campus serving fresh rolls and bento boxes.",
				},
				{
					_id: "2",
					name: "Fake Pizza Place",
					location: "Caulfield Campus",
					url: "https://fakepizza.com",
					avgRating: 4.2,
					imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					description:
						"Your go-to spot for cheesy pizza and late-night cravings.",
				},
			]);

			setLoading(false);
		}, 800); // Optional delay to simulate loading

		return () => clearTimeout(timeout);
	}, []);

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
			{loading ? (
				<p className="text-gray-600">Loading...</p>
			) : businesses.length === 0 ? (
				<p className="text-gray-500 italic">
					You have no businesses yet.
				</p>
			) : (
				<div className="space-y-4">
					{businesses.map((biz) => (
						<BusinessCard
							key={biz._id}
							name={biz.name}
							location={biz.location}
							url={biz.url}
							avgRating={biz.avgRating}
							imageUrl={biz.imageUrl}
							description={biz.description}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default OwnerDashboard;
