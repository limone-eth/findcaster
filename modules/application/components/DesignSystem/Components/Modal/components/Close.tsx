import classNames from 'classnames';

const Close = ({ onRequestClose }: { onRequestClose: () => void }) => {
  const containerClassNames = classNames(
    'flex absolute right-0 shrink-0 justify-end mt-2 mr-2 w-18 p-1 cursor-pointer hover:rounded-xl',
    {
      'hover:bg-gray-200 dark:hover:text-white text-zinc-400 dark:hover:bg-zinc-900': true,
    }
  );

  return (
    <div className={containerClassNames} onClick={onRequestClose}>
      <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </svg>
    </div>
  );
};

export default Close;
