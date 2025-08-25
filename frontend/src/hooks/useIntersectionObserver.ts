import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
}

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean => {
  const {
    threshold = 0.1,
    rootMargin = "50px",
    freezeOnceVisible = true,
    initialIsIntersecting = false,
    ...restOptions
  } = options;

  const [isInView, setIsInView] = useState<boolean>(initialIsIntersecting);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't re-observe if frozen and already visible
    if (freezeOnceVisible && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
        ...restOptions,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, freezeOnceVisible, isInView, restOptions]);

  return isInView;
};
