interface Item {
  children: any;
}

const Item = ({ children }: Item) => children;

Item.role = 'Stack.Item';
Item.displayName = 'Stack.Item';

export default Item;
