import styles from "../../styles/Button.module.css";

export default function Button({ children, variant = "primary", size = "md", ...props }) {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]}`;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
