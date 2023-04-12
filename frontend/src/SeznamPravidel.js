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
import { useEffect } from 'react';
import { List } from "./SadyPravidelAPI";


function SeznamPravidel(props)
    {
        const [rows, setRows] = useState(null);

        useEffect(() => {
            setRows(List().list)
        }, []);
        
        const renderDeleteButton = (params) => {
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
                  <NavLink to={"/pravidla/" + params.id}>
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
            field: 'nazev',
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
          navigate("/pravidla/0");
        }

        if (rows === null) return (<p>Načítání...</p>)
        else return (
            <Box 
            // sx={{ height: 400, width: '100%' }}
            >
              <Container
              sx = {{
                textAlign: 'center',
              }}>
                <Button sx = {{m: 2, backgroundColor: '#196FCA'}} variant="contained" 
           onClick={() => routeChangeToPravidlo()} startIcon={<AddIcon />}>
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