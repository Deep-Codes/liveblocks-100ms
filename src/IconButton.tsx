import styles from './IconButton.module.css';

type Props = {
  onClick: (() => void) | undefined;
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
  ...props
}: Props & JSX.IntrinsicElements['button']) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        isActive ? styles.button_active : ''
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
