// utils/animationVariants.ts
export interface AnimationVariant {
  initial: {
    opacity: number;
    transform: string;
  };
  animate: {
    opacity: number;
    transform: string;
  };
  duration: number;
  delay: number;
}

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, transform: "translateY(60px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    duration: 0.8,
    delay: 0,
  },
  fadeInDown: {
    initial: { opacity: 0, transform: "translateY(-60px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    duration: 0.8,
    delay: 0,
  },
  fadeInLeft: {
    initial: { opacity: 0, transform: "translateX(-60px)" },
    animate: { opacity: 1, transform: "translateX(0)" },
    duration: 0.8,
    delay: 0.2,
  },
  fadeInRight: {
    initial: { opacity: 0, transform: "translateX(60px)" },
    animate: { opacity: 1, transform: "translateX(0)" },
    duration: 0.8,
    delay: 0.4,
  },
  fadeIn: {
    initial: { opacity: 0, transform: "scale(1)" },
    animate: { opacity: 1, transform: "scale(1)" },
    duration: 0.6,
    delay: 0,
  },
  scaleIn: {
    initial: { opacity: 0, transform: "scale(0.8)" },
    animate: { opacity: 1, transform: "scale(1)" },
    duration: 0.6,
    delay: 0,
  },
  bounceIn: {
    initial: { opacity: 0, transform: "scale(0) rotate(-180deg)" },
    animate: { opacity: 1, transform: "scale(1) rotate(0deg)" },
    duration: 1.2,
    delay: 0.1,
  },
  slideInFromBottom: {
    initial: { opacity: 0, transform: "translateY(100px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    duration: 0.8,
    delay: 0,
  },
  slideInFromTop: {
    initial: { opacity: 0, transform: "translateY(-100px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    duration: 0.8,
    delay: 0,
  },
} as const satisfies Record<string, AnimationVariant>;

export type AnimationVariantKey = keyof typeof ANIMATION_VARIANTS;

// Helper function to create custom variants with overrides
export const createAnimationVariant = (
  baseVariant: AnimationVariantKey,
  overrides: Partial<AnimationVariant>
): AnimationVariant => ({
  ...ANIMATION_VARIANTS[baseVariant],
  ...overrides,
});

// Preset animation sequences for common use cases
export const ANIMATION_SEQUENCES = {
  staggeredFadeInUp: (index: number, baseDelay = 0) =>
    createAnimationVariant("fadeInUp", {
      delay: baseDelay + index * 0.1,
    }),
  staggeredFadeInLeft: (index: number, baseDelay = 0) =>
    createAnimationVariant("fadeInLeft", {
      delay: baseDelay + index * 0.15,
    }),
  quickFade: createAnimationVariant("fadeIn", { duration: 0.3 }),
  slowBounce: createAnimationVariant("bounceIn", { duration: 1.8 }),
} as const;
