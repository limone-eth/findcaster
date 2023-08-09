import classNames from 'classnames';

interface Label {
  children: any;
  name: string;
}

const Label = ({ children, name }: Label) => {
  const classNamesComputed = classNames({
    'flex flex-col relative': true,
  });

  return (
    <label className={classNamesComputed} htmlFor={name}>
      <span className="mb-2 text-xs font-semibold uppercase tracking-widest">{children}</span>
    </label>
  );
};

export default Label;
