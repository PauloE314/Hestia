/**
 * Creates only one instance
 * @param {FunctionConstructor} _class
 * @param  {...any} props
 */
export function createOne(_class, ...props) {
  if (!_class.instance) {
    _class.instance = new _class(...props);
  }
  return _class.instance;
}
