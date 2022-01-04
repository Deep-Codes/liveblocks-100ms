import styles from './IconButton.module.css';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  className,
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        isActive ? styles.button_active : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
