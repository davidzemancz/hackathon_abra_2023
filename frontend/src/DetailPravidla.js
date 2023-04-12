import { Box, Button, FormControl, TextField } from "@mui/material";
import { DataGrid} from '@mui/x-data-grid';

function DetailPravidla(){
    return (
        <Box component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <h3> Editace sady pravidel </h3>
            <FormControl>
            <TextField required id="rule_name" label="Název"/>
            <TextField id="rule_payer" label="Zadavatel"/>
            <TextField id="rule_description" label="Popis"/>
            <div>
                <TextField id="rule_upperBound" label="Cena do"/>
                <TextField id="rule_lowerBound" label="Cena od"/>
            </div>
            
            </FormControl>

            <GridPravidel/>

        </Box>
    );
}
function GridPravidel(){

    const columns = [
        { field: 'id', headerName: '',width: 80},
        { field: 'stredisko', headerName: 'Středisko', width: 200, editable: true,},
        {
          field: 'castka',
          headerName: 'Částka',
          type: 'number',
          width: 200,
          editable: true,
        },
        {
          field: 'procenta',
          headerName: 'Procentní podíl',
          type: 'number',
          width: 150,
          editable: true,
        },
        { field: 'zbytek', headerName: 'Zbytek', width: 80, editable: true,},
        { filed: 'delete', headerName: '', width: 80},
      ];

    const rows = [
        {
            id: 1,
            stredisko: 'C',
            castka: 2500,
            procenta: 20,
            zbytek: 'ne',
            delete: 'ne',
        },
        ];

    function novyRadek() {
    }
      
    return (
        <div>
            <DataGrid rows={rows} columns={columns}/>
            <Button> Nové pravidlo </Button>
        </div>
        
    );
    
}
export default DetailPravidla;