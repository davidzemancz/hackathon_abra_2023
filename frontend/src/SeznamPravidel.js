import * as React from 'react';
import { Box, Container } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import { NavLink, redirect } from "react-router-dom";
import {Link} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


function SeznamPravidel(props)
    {
        const [rows, setRows] = useState([
          { id: 1, Jméno: 'Prvni Pravidlo', View: 'Jon', Četnost: 35, Sklady:  {
              A:{hotovost:15, procenta:0, zbytek:false},
              B:{hotovost:15, procenta:0, zbytek:false},
              C:{hotovost:15, procenta:0, zbytek:false},
          }},
          { id: 2, Jméno: 'Druhe Pravidlo', View: 'Cersei', Četnost: 42 },
          { id: 3, Jméno: 'Treti', View: 'Jaime', Četnost: 45 },
          { id: 4, Jméno: '4', View: 'Arya', Četnost: 16 },
          { id: 5, Jméno: '5', View: 'Daenerys', Četnost: 15 },
          { id: 6, Jméno: '6', View: null, Četnost: 150 },
          { id: 7, Jméno: '7', View: 'Ferrara', Četnost: 44 },
          { id: 8, Jméno: '8', View: 'Rossini', Četnost: 36 },
          { id: 9, Jméno: '9', View: 'Harvey', Četnost: 65 },
        ]);

          
        const renderDeleteButton = (params) => {
          console.log(params)
          return (
              <strong>
                  <IconButton aria-label="delete"
                          // variant="contained"
                          // color="primary"
                          // size="small"
                          // style={{ marginLeft: 16 }}
                          onClick={() => smazPolozku(params.id)}
                      >
                          <DeleteIcon />
                      </IconButton>
              </strong>
          )
        }

        const renderViewButton = (params) => {
          return (
              <strong>
                  <NavLink to="pravidlo/0">
                  <IconButton aria-label="edit"
                          // variant="contained"
                          // color="primary"
                          // size="small"
                          // style={{ marginLeft: 16 }}
                      >
                        <EditIcon/>
                      </IconButton>
                      </NavLink>
              </strong>
          )
        }

        const columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          {
            field: 'Četnost',
            headerName: 'Četnost',
            width: 150,
          },
          {
            field: 'Jméno',
            headerName: 'Jméno',
            width: 200,
          },
          {
            field: 'Zobrazit',
            headerName: '',
            width: 80,
            renderCell: renderViewButton,
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
          },
          {
            field: 'Remove',
            headerName: '',
            description: 'Smazat sadu',
            width: 80,
            renderCell: renderDeleteButton,
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
          },
        ];

        function smazPolozku(id) {
            setRows(rows.filter(row => row.id != id))
            //alert("Mazu " + id)
        }
        
        let navigate = useNavigate(); 
        const routeChangeToPravidlo = () =>{ 
          let path = `pravidlo/0`; 
          navigate(path);
        }

        return (
            <Box 
            // sx={{ height: 400, width: '100%' }}
            >
              <Container
              sx = {{
                textAlign: 'center',
              }}>
                <Button sx = {{m: 2, backgroundColor: '#196FCA'}} variant="contained" 
           onClick={() => routeChangeToPravidlo} startIcon={<AddIcon />}>
            Nová sada pravidel
            </Button>
              </Container>
            
              <Container sx={{
                        textAlign: 'center',
                        width: 650
                    }}>
                      <DataGrid autoHeight
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
                disableRowSelectionOnClick
              />
             </Container>
              
            </Box>
          );
    }


export default SeznamPravidel;