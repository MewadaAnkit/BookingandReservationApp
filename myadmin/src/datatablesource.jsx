export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const hotelColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    
  },
  {
    field: "type",
    headerName: "type",
    width: 230,
  },

  {
    field: "title",
    headerName: "title",
    width: 100,
  },
  {
    field: "city",
    headerName: "city",
    width: 100,
  },
  {
    
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const roomColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
    
  },
  {
    field: "desc",
    headerName: "description",
    width: 230,
  },

  {
    field: "price",
    headerName: "price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Capacity/person",
    width: 100,
  },
  {
    
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

