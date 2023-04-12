import { Box, Button, Checkbox, Container, FormControl, TextField, Divider, Grid } from "@mui/material";
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Load, Save } from "./SadyPravidelAPI"
import { useNavigate, useParams } from "react-router-dom";


function DetailPravidla(){
    const [sada, setSada] = useState(null)
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const s = Load(id)
        setSada(s)
        console.log(s)
    }, [])

    if (sada === null) return (<p>Načítání...</p>)
    else return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch'}, textAlign: 'center'
            }}>
            <Container sx={{
                        textAlign: 'center',
                        width: 750
                    }}>
                <Button onClick={(e) => {Save(sada); navigate("/pravidla")}} sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained">
                    Uložit

                </Button>
                <Button onClick={(e) => {navigate("/pravidla")}} sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained">
                    Zpět

                </Button>

                
                <Paper variant="outlined"
                    sx={{
                        textAlign: 'center',
                        height: 370,
                    }}>
                        <h4> Sada pravidel </h4>
                        <FormControl>
                            <div>
                                <TextField required id="rule_name" label="Název" value={sada.nazev} onChange={(e) => setSada({...sada, nazev: e.target.value})}/>
                            </div>
                            <Divider width='700'></Divider>
                            <h5> Podmínky </h5>
                            <div>
                                <TextField id="rule_payer" label="Dodavatel" onChange={(e) => setSada({...sada, dodavatel: e.target.value})}/>
                                <TextField id="rule_description" label="Popis" onChange={(e) => setSada({...sada, popis: e.target.value})}/>
                            </div>
                            <div>
                                <TextField id="rule_upperBound" label="Cena do" onChange={(e) => setSada({...sada, cenaOd: e.target.value})}/>
                                <TextField id="rule_lowerBound" label="Cena od" onChange={(e) => setSada({...sada, cenaDo: e.target.value})}/>
                            </div>
                        </FormControl>
                    </Paper>
            </Container>
            </Box>
            </Grid>

            
            <Grid item xs={6}>
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch'}, textAlign: 'center'
            }}>
                <Container sx={{
                        textAlign: 'center',
                        width: 750
                    }}>
                <GridPravidel sada={sada} setSada={setSada}/>

            </Container>
            </Box>
            </Grid>
            
            

        </Grid>
        
    );
}
export function GridPravidel(props){

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
                                onClick={() => smazPolozku(params.id)}>
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

    const columns = [
        { field: 'id', headerName: '',width: 80},
        { field: 'stredisko', headerName: 'Středisko', width: 120,editable: true,},
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
        { field: 'zbytek', headerName: 'Zbytek',width: 80, renderCell: renderCheckbox, disableClickEventBubbling: true, disableColumnMenu: true, sortable: false,},
        { field: 'delete', headerName: '', width: 100, renderCell: renderDeleteButton, disableClickEventBubbling: true, disableColumnMenu: true, sortable: false,}
      ];

           

    function novyRadek() {
        const novyRadek = {
            id: props.sada.pravidla.length > 0 ? props.sada.pravidla[props.sada.pravidla.length - 1].id + 1 : 1,
            stredisko: 'C',
            castka: 0,
            procenta: 0,
            zbytek: false
        };
        props.setSada({...props.sada, pravidla: [...props.sada.pravidla, novyRadek]})
    }

    function smazPolozku(id) {
        props.setSada({...props.sada, pravidla: props.sada.pravidla.filter(p => p.id != id)})
    }
      
    return (
        <div>
            <Button sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained" onClick={() => novyRadek()} startIcon={<AddIcon />}> Nové pravidlo </Button>
            <DataGrid columns={columns} rows={props.sada.pravidla} autoHeight 
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            sx={{
                textAlign: 'center',
              }}/>
        </div>
        
    );
    
}
export default DetailPravidla;