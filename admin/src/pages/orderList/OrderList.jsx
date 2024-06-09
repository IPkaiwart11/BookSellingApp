

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function OrderList() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const handleOpenModal = (products) => {
    setCurrentProducts(products);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentProducts([]);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "products",
      headerName: "Products",
      width: 400,
      renderCell: (params) => {
        return (
          <div
            className="productListItem"
            onClick={() => handleOpenModal(params.row.products)}
            style={{
              overflow: 'scroll',
              maxHeight: '200px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            {params.row.products.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px', maxHeight: '150px', overflow: 'scroll' }}>
                <span>Quantity: {item.quantity}</span> Display quantity
                <p>{item.product.title}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/orders/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />

      {isOpen && (
        <div className="modal" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          zIndex: 1000,
          border: '1px solid #ccc',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <button onClick={handleCloseModal} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}>Close</button>
          <h2>Product Details</h2>
          <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
            {currentProducts.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <span>Quantity: {item.quantity}</span>
                
                <p>{item.product.title}</p>
                <img style={{maxWidth:'200px', maxHeight:'200px'}} src={item.product.img} alt="" />
                <p>Description: {item.product.desc}</p>
                <p>Price: Rs{item.product.price}</p>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
