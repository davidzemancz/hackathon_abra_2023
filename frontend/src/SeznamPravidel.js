import * as React from 'react';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';

  
const renderDetailsButton = (params) => {
    return (
        <strong>
            <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                       
                    }}
                >
                    More Info
                </Button>
        </strong>
    )
}



const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Četnost',
      headerName: 'Četnost',
      width: 150,
      editable: true,
    },
    {
      field: 'Jméno',
      headerName: 'Jméno',
      width: 150,
      editable: true,
    },
    {
      field: 'Zobrazit',
      headerName: 'Zobrazit',
      width: 150,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'Remove',
      headerName: 'Smazat',
      description: 'Smazat sadu',
      width: 150,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ];

const rows = [
    { id: 1, Name: 'Prvni Pravidlo', View: 'Jon', Četnost: 35, Sklady:  {
        A:{hotovost:15, procenta:0, zbytek:false},
        B:{hotovost:15, procenta:0, zbytek:false},
        C:{hotovost:15, procenta:0, zbytek:false},
    }},
    { id: 2, Name: 'Lannister', View: 'Cersei', Četnost: 42 },
    { id: 3, Name: 'Lannister', View: 'Jaime', Četnost: 45 },
    { id: 4, Name: 'Stark', View: 'Arya', Četnost: 16 },
    { id: 5, Name: 'Targaryen', View: 'Daenerys', Četnost: 15 },
    { id: 6, Name: 'Melisandre', View: null, Četnost: 150 },
    { id: 7, Name: 'Clifford', View: 'Ferrara', Četnost: 44 },
    { id: 8, Name: 'Frances', View: 'Rossini', Četnost: 36 },
    { id: 9, Name: 'Roxie', View: 'Harvey', Četnost: 65 },
  ];


function SeznamPravidel()
    {
        return (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          );
    }


export default SeznamPravidel;