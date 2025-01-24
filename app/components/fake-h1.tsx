import type { DetailedHTMLProps } from "react";

export const FakeH1 = (
	props: DetailedHTMLProps<
		React.HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	>,
) => {
	return <h1 className="clip-fake-hidden absolute">{props.children}</h1>;
};
