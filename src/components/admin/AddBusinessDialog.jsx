// src/components/owner/AddBusinessDialog.jsx

import React from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

const AddBusinessDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700">
					<Plus className="w-4 h-4" />
					Add Business
				</Button>
			</DialogTrigger>

			<DialogContent
                // className="relative fixed z-[9999] max-w-[90vw] lg:max-w-4xl md:min-w-[70vw] max-h-[80vh] lg:max-h-[95vh] my-auto bg-white shadow-lg rounded-2xl overflow-hidden flex p-0 inset-0 mx-auto"
                className="min-w-[70vw] min-h-[70vh] p-0 fixed z-[9999]"
            >
				<div className="flex w-full h-full relative overflow-hidden">
					{/* Left section */}
					<div className="w-full lg:w-1/2 p-8 flex flex-col justify-center gap-4">
						<DialogTitle className="text-2xl font-bold">
							Claim your business!
						</DialogTitle>
						<DialogDescription className="text-base">
							Search your business by name
						</DialogDescription>
						<div className="relative mt-2">
							<Input
								placeholder="Enter business name"
								className="rounded-full pr-10 h-10 px-4 text-sm"
							/>
							<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
						</div>
					</div>

					{/* Right section */}
					<div className="lg:w-1/2 items-center justify-center hidden lg:flex">
						<img
							src="/business-graphic.png"
							alt="Business graphic"
							className="w-full h-auto object-cover"
						/>
					</div>

				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddBusinessDialog;
