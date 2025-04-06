import { Input } from "@/src/components/ui/input";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormField = React.forwardRef(({
    label, type,
    placeholder, name,
    errors, className = '',
    ...props
}, ref) => {
    const [isVisible, setIsVisible] = useState(type !== 'password');

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <div className={className}>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
                {label}
            </label>
            <div className="relative group">
                <Input
                    id={name}
                    name={name}
                    type={isVisible ? 'text' : 'password'} // Toggle input type based on isVisible state
                    placeholder={placeholder}
                    ref={ref}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 inter-regular"
                    aria-describedby={`desc-${name}`}
                    {...props}
                />
                <span id={`desc-${name}`} className="sr-only">
                    Input field for {name}
                </span>
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary"
                    >
                        {isVisible ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {errors && (
                <div className="pl-2 mt-1 text-xs text-red-700">{errors.message}</div>
            )}
        </div>
    );
});

FormField.displayName = "FormField";

export default FormField;
