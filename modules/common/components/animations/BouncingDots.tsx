import classNames from 'classnames';

interface BouncingDotsInterface {
  size?: 's' | 'm' | 'l' | 'xl';
}

const BouncingDots = ({ size = 'm' }: BouncingDotsInterface) => {
  const svgClassNames = classNames('', {
    'w-5 h-5': size === 's',
    'w-8 h-8': size === 'm',
    'w-10 h-10': size === 'l',
    'w-16 h-16': size === 'xl',
  });

  return (
    <div aria-label="Loading..." role="status">
      <svg
        className={svgClassNames}
        version="1.1"
        id="L5"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle className="fill-gray-400" stroke="none" cx="10" cy="50" r="10">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle className="fill-gray-400" stroke="none" cx="50" cy="50" r="10">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle className="fill-gray-400" stroke="none" cx="90" cy="50" r="10">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    </div>
  );
};

export default BouncingDots;
