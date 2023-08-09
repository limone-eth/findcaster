const Option = ({ children, ...others }: any) => <option {...others}>{children}</option>;

Option.role = 'Select.Option';
Option.displayName = 'Select.Option';

export default Option;
