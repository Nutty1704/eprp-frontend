import React from "react";
import { Trash2 } from "lucide-react";

const MenuCard = ({ item, isOwner = false, onDelete = () => {} }) => {
	if (!item) return null;

	return (
		<div className="border rounded-md overflow-hidden bg-white shadow-sm w-full max-w-sm">
			<div className="h-48 relative">
				{item.imageUrl ? (
					<img
						src={item.imageUrl}
						alt={item.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gray-100 flex items-center justify-center">
						<span className="text-gray-400">No image</span>
					</div>
				)}
			</div>
			<div className="flex justify-between items-center p-3 border-t h-12">
				<h3
					className="font-medium text-base leading-snug line-clamp-2 max-w-[70%]"
					title={item.name}
				>
					{item.name}
				</h3>
				<div className="flex items-center gap-2">
					<p className="font-medium text-right">
						${item.price.toFixed(2)}
					</p>
					{isOwner && (
						<Trash2
							className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-700"
							onClick={(e) => {
								e.stopPropagation();
								onDelete();
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export { MenuCard };
