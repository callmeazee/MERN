


const Card = ({title="My card Title", children="demo text data" , footer="Footer"}) => {
  return (
    <div className="shadow-lg p-8 rounded-lg border border-gray-100 space-y-2">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="text-gray-500">
                {children}
      </div>
      {
        footer &&
      <div className="mt-4">
        <h1>{ footer}</h1>
      </div>
   }
    </div>
  );
};

export default Card