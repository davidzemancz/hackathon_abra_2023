import { Box, FormControl, TextField } from "@mui/material";
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
        { field: 'stredisko', headerName: 'Středisko', width: 200},
        {
          field: 'castka',
          headerName: 'Částka',
          width: 200
        },
        {
          field: 'procenta',
          headerName: 'Procentní podíl',
          width: 150
        },
        { field: 'zbytek', headerName: 'Zbytek', width: 80},
      ];

    const rows = [];
      
    return <DataGrid rows={rows} columns={columns}/>
}
export default DetailPravidla;