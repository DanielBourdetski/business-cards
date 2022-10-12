const acceptedTypes = ['submit', 'reset', 'button'];

const Button = ({ type = 'button', label, callback, className, overwriteClassName }) => {
  if (!acceptedTypes.includes(type)) throw new Error('invalid button type');

  return (
    <button
      className={
        overwriteClassName
          ? overwriteClassName
          : className + ' py-1 px-3 m-2 border border-gray-600 rounded hover:bg-slate-800 hover:bg-opacity-20'
      }
      type={type}
      onClick={callback}
    >
      {label}
    </button>
  );
};

export default Button;
