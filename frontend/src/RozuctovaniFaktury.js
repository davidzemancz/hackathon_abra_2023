import { Box, Paper, TextField, Typography } from "@mui/material";
import ZobrazQueryParametry from "./ZobrazQueryParametry";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'react-router-dom'

function RozuctovaniFaktury(){

    const [faktura, setFaktura] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams()

    localStorage.setItem("authSessionId", searchParams.get('authSessionId'));
    localStorage.setItem("companyUrl", searchParams.get('companyUrl'));
    localStorage.setItem("objectId", searchParams.get('objectId'));
    localStorage.setItem("objectIds", searchParams.get('objectIds'));

    useEffect(() => {
        axios.get(`${localStorage.getItem("companyUrl")}/faktura-prijata/${localStorage.getItem("objectId")}.json?authSessionId=${localStorage.getItem("authSessionId")}`).then((response) => {
            const fak = response.data["winstrom"]["faktura-prijata"][0];
            setFaktura(fak);
        console.log("Faktura:",fak);
        });
    }, []);

    if (faktura === null) return ( <p>Načítání...</p>);
    else return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <ZobrazQueryParametry/>
                </Paper>
            </Grid>
            <Grid  item xs={6}>
                <Paper>
                    <Typography>
                    <TextField
                        id="dodavatel"
                        label="Dodavatel"
                        InputProps={{
                            readOnly: true,
                          }}
                        value={faktura.nazFirmy}
                        />
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                Cuuus
                </Paper>
            </Grid>
        </Grid>    
    )
}

export default RozuctovaniFaktury;