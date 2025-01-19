import { cva } from "class-variance-authority";

export const textVariants = cva("text-foreground", {
	variants: {
		variant: {
			default: "text-sm sm:text-base",
			h2: "font-bold text-xl sm:text-2xl",
			h3: "font-semibold text-base sm:text-xl",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});
