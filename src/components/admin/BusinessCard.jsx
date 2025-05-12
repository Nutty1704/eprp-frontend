import React from "react";
import { Separator } from "@/components/ui/separator";

const BusinessCard = ({
	name,
	location,
	url,
	avgRating,
	imageUrl,
	description,
	reviewCount,
}) => {
	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex h-32 items-stretch">
			<div className="w-40 h-full bg-gray-100 flex items-center justify-center overflow-hidden">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-full object-cover block"
					/>
				) : (
					<span className="text-gray-400 text-sm">No image</span>
				)}
			</div>

			<div className="flex flex-1 px-6 py-4 gap-6 items-start overflow-hidden">
        <div className="flex flex-col justify-between w-[55%] overflow-hidden">
					<h2 className="text-xl font-semibold text-gray-800 truncate">
						{name}
					</h2>
					<p className="text-sm text-gray-600 truncate">{location}</p>
					<p className="text-sm text-gray-600 mt-1 break-words">{url}</p>
					<p className="text-sm mt-1 ">
						<span className="text-yellow-600">
							⭐ {avgRating?.toFixed(1)} / 5
						</span>
						<span className="text-gray-500 ml-1">
							({reviewCount || 0} reviews)
						</span>
					</p>
				</div>

				<Separator
					orientation="vertical"
					className="self-stretch w-[1px] bg-gray-300"
				/>

				<div className="w-[45%] overflow-hidden">
					<p className="text-sm text-gray-700 line-clamp-4">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BusinessCard;
