import { Box, Button, Checkbox, Container, FormControl, TextField } from "@mui/material";
import { DataGrid} from '@mui/x-data-grid';
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

const renderDeleteButton = (params) => {
    return (
        <strong>
            {/* <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        // <Link to='/pravidlo' > some stuff </Link>
                    }}
                >
                    Delete
                </Button> */}
                <IconButton aria-label="delete" 
                            onClick={() => {
                        // <Link to='/pravidlo' > some stuff </Link>
                    }}>
                    <DeleteIcon />
                </IconButton>
        </strong>
    )
}

const renderCheckbox = (params) => {
    return(
        <Checkbox />
    )
}

export function ZapoctenaFaktura(props){
    console.log("THIS IS ROWS")
    console.log(props.rows)
    const columns = [
        { field: 'id', headerName: '',width: 80, textAlign:"center",},
        { field: 'stredisko', headerName: 'Středisko', width: 120,textAlign:"center",},
        {
          field: 'castka',
          headerName: 'Částka',
          type: 'number',
          width: 100,
          textAlign:"center",
        },
        {
            field: 'procenta',
            headerName: 'Procenta',
            type: 'number',
            width: 100,
            textAlign:"center",
        },
        {
            field: 'soucet',
            headerName: 'Součet',
            type: 'number',
            width: 100,
            textAlign:"center",
        },
        { field: 'zbytek', headerName: 'Zbytek',width: 100, textAlign:"center",},
      ];

    return (
        <div>
            <DataGrid columns={columns} rows={props.rows} autoHeight 
            sx={{
                textAlign: 'center',
              }}/>
        </div>
    );
    
}



export default ZapoctenaFaktura;