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

function DetailPravidla(){
    return (
        <Box component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch'}, textAlign: 'center'
        }}>
            <h3> Editace sady pravidel </h3>
            <Container sx={{
                        textAlign: 'center',
                        width: 800
                    }}>
                <Button sx={{ m: 2 }} variant="contained">
                    Uložit

                </Button>

                
                <Paper elevation={2}
                    sx={{
                        textAlign: 'center',
                    }}>
                        <FormControl>
                            <div>
                                <TextField required id="rule_name" label="Název"/>
                            </div>
                            <div>
                                <TextField id="rule_payer" label="Zadavatel"/>
                                <TextField id="rule_description" label="Popis"/>
                            </div>
                            <div>
                                <TextField id="rule_upperBound" label="Cena do"/>
                                <TextField id="rule_lowerBound" label="Cena od"/>
                            </div>
                        </FormControl>
                    </Paper>
            </Container>
            
            
            <Container sx={{
                        textAlign: 'center',
                        width: 800
                    }}>
                <GridPravidel/>

            </Container>
            

        </Box>
    );
}
export function GridPravidel(){

    const columns = [
        { field: 'id', headerName: '',width: 80},
        { field: 'stredisko', headerName: 'Středisko', width: 120,},
        {
          field: 'castka',
          headerName: 'Částka',
          type: 'number',
          width: 120,
          editable: true,
        },
        {
            field: 'procenta',
            headerName: 'Procenta',
            type: 'number',
            width: 100,
            editable: true,
        },
        { field: 'zbytek', headerName: 'Zbytek',width: 80, renderCell: renderCheckbox, disableClickEventBubbling: true,},
        { field: 'delete', headerName: '', width: 100, renderCell: renderDeleteButton, disableClickEventBubbling: true,}
      ];

    const [rows, setRows] = useState([
        {
            id: 1,
            stredisko: 'C',
            castka: 2500,
            procenta: 20,
            zbytek: true, 
        },
        ]);

    function novyRadek() {
        const novyRadek = {
            id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 1,
            stredisko: 'C',
            castka: 0,
            procenta: 0,
        };
        setRows(rows => [...rows, novyRadek])
    }
      
    return (
        <div>
            <Button sx={{ m: 2 }} variant="contained" onClick={() => novyRadek()} startIcon={<AddIcon />}> Nové pravidlo </Button>
            <DataGrid columns={columns} rows={rows} autoHeight 
            sx={{
                textAlign: 'center',
              }}/>
        </div>
        
    );
    
}
export default DetailPravidla;