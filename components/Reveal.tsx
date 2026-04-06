"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function Reveal({ children, className, delay = 0, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
