import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import axios from 'axios'
const Datatable = ({columns}) => {
  const location = useLocation()
  const path = location.pathname.split('/')[1];
  
  const {data ,loading ,error} = useFetch(`http://localhost:8000/api/${path}`)

  const handleDelete = async (id) => {
    try {
    console.log(id)

       await axios.delete(`http://localhost:8000/api/${path}/${id}`);
      // console.log('deleted successfull')
      setData(data.filter((item) => item._id !== id));
      
    } catch (error) {
      
    }

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
