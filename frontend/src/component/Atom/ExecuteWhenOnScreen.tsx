import {useEffect, useRef} from "react";

export default function ExecuteWhenOnScreen({
	children = null,
	onVisible,
}: {
	children?: React.ReactNode;
	onVisible: () => void | Promise<void>;
}) {
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						onVisible();
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			},
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, [onVisible]);

	return <div ref={elementRef}>{children}</div>;
}
