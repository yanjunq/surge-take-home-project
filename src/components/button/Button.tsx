import './button.css';
import classNames from 'classnames';

type Props = {
  isDefault: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ isDefault, onClick, children }: Props) {
  return (
    <button className={classNames('button', { default: isDefault })} onClick={onClick}>
      {children}
    </button>
  )
}
