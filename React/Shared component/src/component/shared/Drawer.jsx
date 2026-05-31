

const Drawer = ({children="Your content goes here", title="Drawer Title", open=false} ) => {

  return (
    <>
      <div
        style={{
          right: open ? 0 : "-50%",
          transition: "ease-in-out .3s",
        }}
        className="shadow-lg fixed top-0  w-6/12 h-full overflow-auto p-8 z-10000 space-y-4">
                 <h1 className="text-lg font-semibold">{ title}</h1>
        <div className="border-b border-gray-100 -mx-8" />
        <div className="text-gray-500">
      {children}
        </div>
        <button
          className="absolute top-3 right-6"
        >
          <i className="ri-close-circle-fill"></i>
        </button>
      </div>
    </>
  );
};

export default Drawer;
