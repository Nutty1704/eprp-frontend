import React, { useState } from "react";
import GoogleAuth from "./oauth/GoogleAuth";
import AuthForm from "./AuthForm";


const getHeading = (isSignUp, isOwner) => {
    return (
        <h2 className="text-3xl rubik-bold text-gray-900">
            {isSignUp ? (
                <>
                    Join{" "}
                    <span className="text-primary">
                        {isOwner ? "TasteMonash for Business" : "TasteMonash"}
                    </span>
                </>
            ) : (
                <>
                    Welcome Back to{" "}
                    <span className="text-primary">
                        {isOwner ? "TasteMonash for Business" : "TasteMonash"}
                    </span>
                </>
            )}
        </h2>

    )
}

const Auth = ({ isOwner = false }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="w-full lg:min-w-[70vw] min-h-[70vh] max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex">

            {/* Left - Login Form */}
            <div className="w-full lg:w-3/5 xl:w-2/5 p-8 flex flex-col justify-center">
                <div className="mb-6 space-y-2">
                    {getHeading(isSignUp, isOwner)}
                    <p className="text-gray-600 inter-regular">
                        {isSignUp ? "Create an account to get started" : "Sign in to continue"}
                    </p>
                </div>

                <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} isOwner={isOwner} />

                {/* Separator */}
                <div className="flex items-center justify-center w-full my-4">
                    <div className="border-t border-gray-300 w-full" />
                    <span className="mx-4 text-gray-600">or</span>
                    <div className="border-t border-gray-300 w-full" />
                </div>

                {/* OAuth tools */}
                <div className="flex items-center justify-center">
                    <GoogleAuth className="w-full max-w-sm flex justify-center" isOwner={isOwner} />
                </div>
            </div>

            {/* Right - Image */}
            <div className="w-2/5 xl:w-3/5 hidden lg:block relative">
                <img src="/auth.jpg" alt="Login Visual" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/45 px-[10%]">
                    {!isOwner
                        ? <AltOverlay
                            title={"Own a Business? Take Control."}
                            subtitle={"Register your business, respond to customer reviews, and build your online reputation—all from your owner portal."
                            }
                            buttonText={"Register your business"}
                        />
                        : <AltOverlay
                            title="Discover & Review Amazing Restaurants"
                            subtitle="Find top-rated dining spots, share your experiences, and explore new flavors with TasteMonash."
                            buttonText="Start Exploring"
                        />
                    }
                </div>
            </div>
        </div>
    );
};

// AltOverlay Component
const AltOverlay = ({ title, subtitle, buttonText }) => (
    <div className="h-full w-full flex flex-col justify-center space-y-4">
        <h1 className="text-white font-bold text-4xl rubik-bold">{title}</h1>
        <p className="text-white text-lg inter-regular">{subtitle}</p>
        <a
            href="/owner-portal"
            className="mt-2 inline-block bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition lg:w-3/5 2xl:w-2/5"
        >
            {buttonText} →
        </a>
    </div>
);

export default Auth;
