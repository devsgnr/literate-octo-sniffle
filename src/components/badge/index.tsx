import { ReactChild } from "react";
import styles from "./badge.module.scss";

interface BadgeProps {
  status: string;
  children: ReactChild;
}

const Badge = ({ status, children }: BadgeProps) => {
  return (
    <div data-status={status} className={styles.badge}>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default Badge;
