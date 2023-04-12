import { Box, ClickAwayListener, Paper, TextField, Typography } from "@mui/material";
import ZobrazQueryParametry from "./ZobrazQueryParametry";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'react-router-dom'
import FormControl from "@mui/material/FormControl";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import SeznamPravidel from "./SeznamPravidel";
import { GridPravidel } from "./DetailPravidla"
import { ZapoctenaFaktura } from "./ZapoctenaFaktura";

function RozuctovaniFaktury() {

    
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
            console.log("Faktura:", fak);
        });
    }, []);
   


    if (faktura === null) return (<p>Načítání...</p>);
    else return (
        <Grid container spacing={2}>
            {/* <Grid item xs={12}>
                <Paper>
                    <ZobrazQueryParametry />
                </Paper>
            </Grid> */}
            <Grid item xs={6}>
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch'}, textAlign: 'center'
            }}>
                <h3> Faktura </h3>
                <Paper sx={{m:2, borderColor:'#BAD5F3'}} variant="outlined">
                    <FormControl>
                        <TextField
                            id="dodavatel"
                            label="Dodavatel"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={faktura.nazFirmy}
                        />
                        <TextField
                            id="popis"
                            label="Popis"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={faktura.popis}
                        />
                        <TextField
                            id="sumCelkem"
                            label="Celkem"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={faktura.sumCelkem}
                        />
                    </FormControl>
                </Paper>
            </Box>
                <Paper variant="outlined" sx={{m:2, borderColor:'#BAD5F3'}}>
                   <ZapoctenaFaktura rows={zauctovani_faktury(faktura, "", ["A","B","C"])}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    {/* <SeznamPravidel/> */}
                </Paper>
            </Grid>
        </Grid>

    )

function zauctovani_faktury(faktura, pravidlo) {
    
    var MockPravidlo = 
        { id: 1, Jméno: 'Prvni Pravidlo', View: 'Jon', Četnost: 35, Strediska:  [
            {klic: "A", hotovost:15, procenta:0, zbytek:true},
            {klic: "B", hotovost:30, procenta:0, zbytek:false},
            {klic: "C",hotovost:15, procenta:25, zbytek:false}]
        }

    var zauctovani = []
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
        zauctovani.push({id:i,castka:0,procenta:0,procentaCastka:0,soucet:0,zbytek:0, stredisko:MockPravidlo.Strediska[i].klic});
}
    var celkovePenez = faktura.sumCelkem;
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
            zauctovani[i].castka = MockPravidlo.Strediska[i].hotovost;
            celkovePenez -= MockPravidlo.Strediska[i].hotovost;
            console.log(celkovePenez)   
    }

    var odecist = 0
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
        zauctovani[i].procentaCastka = celkovePenez/100  * MockPravidlo.Strediska[i].procenta;
        zauctovani[i].procenta = MockPravidlo.Strediska[i].procenta;
        celkovePenez -= celkovePenez/100  * MockPravidlo.Strediska[i].procenta;
}
    
    celkovePenez -= odecist;
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
        if (MockPravidlo.Strediska[i].zbytek == true) zauctovani[i].zbytek = celkovePenez
    }

    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
        zauctovani[i].soucet = zauctovani[i].castka + zauctovani[i].procentaCastka + zauctovani[i].zbytek;
    }

   
    zauctovani.push({id:"SUM", soucet:faktura.sumCelkem})
    return zauctovani;

}
}


export default RozuctovaniFaktury;