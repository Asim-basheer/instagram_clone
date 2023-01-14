import { DarkModeChecker } from '../helpers/darkModeChecker';

const LeftNavPopLeft = ({ children, status = false }) => {
  return (
    <div
      className={`left-nav-popup-left background--other  border-right ${
        status ? 'active' : ''
      } ${DarkModeChecker()}`}
    >
      {children}
    </div>
  );
};

export default LeftNavPopLeft;
