import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8080";

const App = () => {
  const [product, setProduct] = useState([]);
  const [render, setRender] = useState(0);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const productFormModel = {
    title: "",
    price: "",
    discount: "",
  };
  const [productForm, setProductForm] = useState(productFormModel);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchProducts();
  }, [render]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProduct(data);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    }
  };

  const handleProductForm = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;

    setProductForm({
      ...productForm,
      [key]: value,
    });
  };

  const createProduct = async (e) => {
    try {
      e.preventDefault();

      await axios.post("/products", productForm);
      setRender(render + 1);
      //to clear the form
      setProductForm(productFormModel);
      setOpen(false);
      toast.success("Product created successfully", { position: "top-center" });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message, {
        position: "top-center",
      });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setRender(render + 1);
      toast.success("Product Deleted", { position: "top-center" });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message, {
        position: "top-center",
      });
    }
  };

  const editProduct = (item) => {
    setEditId(item._id);
    setOpen(true);

    setProductForm({
      title: item.title,
      price: item.price,
      discount: item.discount,
    });
  };

  const saveProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`/products/${editId}`, productForm);
      setRender(render + 1);
      setProductForm(productFormModel);
      setEditId(null);
      setOpen(false);
      toast.success("Product saved", { position: "top-center" });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    // <div className="bg-gray-200 animate__animated animate__fadeInUp h-screen flex items-end overflow-hidden">
    //   <div className="overflow-auto space-y-8 p-6 bg-white w-8/12 mx-auto h-[80%] rounded-t-4xl border-t-32 border-t-rose-400 shadow-lg">
    //     <h1 className="text-4xl font-bold text-center border-b border-b-gray-200 pb-8">
    //       Product Crud
    //     </h1>
    //     <div className="flex justify-end ">
    //       <button
    //         className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-rose-400 cursor-pointer"
    //         onClick={() => setOpen(true)}>
    //         <i className="ri-add-line mr-2"></i>
    //         New Product
    //       </button>
    //     </div>
    //     <table className="w-full">
    //       <tr className="bg-rose-400 text-left text-white">
    //         <th className="py-3 pl-4">Product</th>
    //         <th>Price </th>
    //         <th>Discount</th>
    //         <th>Amount</th>
    //         <th>Date</th>
    //         <th>Actions</th>
    //       </tr>

    //       {product.map((item, index) => (
    //         <tr
    //           key={index}
    //           className="border-b border-b-gray-200 text-zinc-500">
    //           <td className="py-3 pl-4 capitalize">{item.title}</td>
    //           <td>₹{item.price}</td>
    //           <td>{item.discount}%</td>
    //           <td>
    //             ₹{(item.price - (item.price * item.discount) / 100).toFixed(0)}
    //           </td>
    //           <td>{moment(item.createdAt).format(" DD-MM-YY, hh:mm a")}</td>
    //           <td>
    //             <div className="space-x-3 items-end">
    //               <button className="bg-green-100 text-green-500 w-8 h-8 rounded hover:bg-green-400 hover:text-white cursor-pointer">
    //                 <i className="ri-edit-line"></i>
    //               </button>
    //               <button
    //                 className="bg-rose-100 text-rose-500 w-8 h-8 rounded hover:bg-rose-400 hover:text-white cursor-pointer"
    //                 onClick={() => deleteProduct(item._id)}>
    //                 <i className="ri-delete-bin-2-line"></i>
    //               </button>
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </table>
    //     {open && (
    //       <div className="space-y-4 w-1/2 p-5 rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl bg-white border border-gray-200 animate__animated animate__pulse ">
    //         <h1 className="text-xl font-semibold">Add a new Product</h1>

    //         <form className="flex flex-col gap-3" onSubmit={createProduct}>
    //           <input
    //             type="text"
    //             name="title"
    //             placeholder="enter product name"
    //             className="border border-gray-200 px-3 py-2 rounded"
    //             required
    //             onChange={handleProductForm}
    //             value={productForm.title}
    //           />

    //           <input
    //             type="number"
    //             name="price"
    //             placeholder="enter product price"
    //             className="border border-gray-200 px-3 py-2 rounded"
    //             required
    //             onChange={handleProductForm}
    //             value={productForm.price}
    //           />

    //           <input
    //             name="discount"
    //             placeholder="enter the discount if any"
    //             className="border border-gray-200 px-3 py-2 rounded"
    //             onChange={handleProductForm}
    //             value={productForm.discount}
    //           />

    //           <button
    //             type="submit"
    //             className="bg-indigo-500  py-2 hover:bg-blue-500 cursor-pointer rounded text-white font-medium">
    //             Create
    //           </button>
    //         </form>
    //         <button
    //           className="absolute top-2 right-2 cursor-pointer text-xl text-blue-600 hover:text-blue-700 transition-all .3s"
    //           onClick={() => setOpen(false)}>
    //           <i className="ri-close-circle-fill"></i>
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="bg-gray-200 animate__animated animate__fadeInUp min-h-screen flex items-end overflow-hidden">
      <div className="overflow-auto space-y-6 p-4 md:p-6 bg-white w-full sm:w-11/12 md:w-10/12 lg:w-8/12 mx-auto h-[85vh] rounded-t-3xl md:rounded-t-4xl border-t-16 md:border-t-32 border-t-rose-400 shadow-lg">
        {/* Header Section */}
        <h1 className="text-2xl md:text-4xl font-bold text-center border-b border-b-gray-200 pb-4 md:pb-8">
          Product Crud
        </h1>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            className="w-full sm:w-auto bg-violet-600 text-white px-6 py-2.5 rounded hover:bg-rose-400 cursor-pointer flex items-center justify-center transition-colors"
            onClick={() => setOpen(true)}>
            <i className="ri-add-line mr-2"></i>
            New Product
          </button>
        </div>

        {/* --- Responsive Product Display --- */}

        {/* 1. Mobile & Tablet View: Card Layout (Hidden on Desktop) */}
        <div className="block md:hidden space-y-4">
          {product.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 space-y-3 bg-zinc-50 shadow-sm">
              <div className="flex justify-between items-start border-b border-gray-200 pb-2">
                <div>
                  <h3 className="font-semibold text-zinc-800 text-lg capitalize">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {moment(item.createdAt).format("DD-MM-YY, hh:mm a")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-100 text-green-500 w-8 h-8 rounded hover:bg-green-400 hover:text-white cursor-pointer transition-colors"
                    onClick={() => editProduct(item)}>
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    className="bg-rose-100 text-rose-500 w-8 h-8 rounded hover:bg-rose-400 hover:text-white cursor-pointer transition-colors"
                    onClick={() => deleteProduct(item._id)}>
                    <i className="ri-delete-bin-2-line"></i>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm text-zinc-600">
                <div>
                  <span className="block text-xs text-zinc-400 font-medium">
                    Price
                  </span>
                  <span className="line-through text-xs">₹{item.price}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 font-medium">
                    Discount
                  </span>
                  <span className="text-rose-500">-{item.discount}%</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 font-medium">
                    Final Amount
                  </span>
                  <span className="font-bold text-zinc-800">
                    ₹
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      0,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop View: Standard Table Layout (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rose-400 text-white">
                <th className="py-3 pl-4 rounded-l-md">Product</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Date</th>
                <th className="py-3 pr-4 rounded-r-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-b-gray-200 text-zinc-500 hover:bg-zinc-50 transition-colors">
                  <td className="py-4 pl-4 capitalize font-medium text-zinc-700">
                    {item.title}
                  </td>
                  <td>₹{item.price}</td>
                  <td>{item.discount}%</td>
                  <td className="font-semibold text-zinc-800">
                    ₹
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      0,
                    )}
                  </td>
                  <td className="text-sm">
                    {moment(item.createdAt).format("DD-MM-YY, hh:mm a")}
                  </td>
                  <td>
                    <div className="flex space-x-3 items-center">
                      <button
                        className="bg-green-100 text-green-500 w-8 h-8 rounded hover:bg-green-400 hover:text-white cursor-pointer transition-colors"
                        onClick={() => editProduct(item)}>
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        className="bg-rose-100 text-rose-500 w-8 h-8 rounded hover:bg-rose-400 hover:text-white cursor-pointer transition-colors"
                        onClick={() => deleteProduct(item._id)}>
                        <i className="ri-delete-bin-2-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Responsive Modal Popup --- */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="relative space-y-4 w-full max-w-md p-5 md:p-6 rounded-xl shadow-2xl bg-white border border-gray-200 animate__animated animate__pulse">
              <h1 className="text-xl font-semibold text-zinc-800 pr-6">
                {editId ? "Edit Product" : "Add  New Product"}
              </h1>

              <form
                className="flex flex-col gap-4"
                onSubmit={editId ? saveProduct : createProduct}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-500">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="enter product name"
                    className="border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    onChange={handleProductForm}
                    value={productForm.title}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-500">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="enter product price"
                    className="border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    onChange={handleProductForm}
                    value={productForm.price}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-500">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    placeholder="enter the discount if any"
                    className="border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={handleProductForm}
                    value={productForm.discount}
                  />
                </div>
                {editId ? (
                  <button
                    type="submit"
                    className="bg-indigo-500 py-2.5 mt-2 hover:bg-blue-500 cursor-pointer rounded text-white font-medium transition-colors">
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-rose-400 py-2.5 mt-2 hover:bg-rose-500 cursor-pointer rounded text-white font-medium transition-colors">
                    Create
                  </button>
                )}
              </form>

              {/* Close Modal Button */}
              <button
                className="absolute top-4 right-4 cursor-pointer text-xl text-zinc-400 hover:text-rose-500 transition-colors"
                onClick={() => {
                  setOpen(false);
                  setEditId(null);
                  setProductForm(productFormModel);
                }}>
                <i className="ri-close-line scale-125"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
