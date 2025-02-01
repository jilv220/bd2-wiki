import { RiArrowUpLine } from "@remixicon/react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { Button } from "./ui/button";

export const Scroller = () => {
	const [{ y }, scrollTo] = useWindowScroll();

	// Only show when scrolled down at least 100px
	if (!y || y < 100) return null;

	return (
		<Button
			variant="accent"
			size="icon"
			className="fixed right-4 bottom-4 z-50 rounded-full opacity-90 shadow-md transition-opacity sm:right-6 sm:bottom-6"
			onClick={() => {
				scrollTo({
					left: 0,
					top: 0,
					behavior: "smooth",
				});
			}}
		>
			<RiArrowUpLine className="h-5 w-5" />
		</Button>
	);
};
