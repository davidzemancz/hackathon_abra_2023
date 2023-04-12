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
            var a = zauctovani_faktury(fak, "", ["A","B","C"]);
            console.log(a)
        });
    }, []);
   


    if (faktura === null) return (<p>Načítání...</p>);
    else return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <ZobrazQueryParametry />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
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
                <Paper>
                   <GridPravidel/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <SeznamPravidel/>
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

    var zauctovani = {}
    var celkovePenez = faktura.sumCelkem;
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
            zauctovani[MockPravidlo.Strediska[i].klic] = MockPravidlo.Strediska[i].hotovost;
            celkovePenez -= MockPravidlo.Strediska[i].hotovost;
            console.log(celkovePenez)   
    }

    var odecist = 0
    for (let i = 0; i < MockPravidlo.Strediska.length; i++) {
        zauctovani[MockPravidlo.Strediska[i].klic] += celkovePenez/100  * MockPravidlo.Strediska[i].procenta;
        celkovePenez -= celkovePenez/100  * MockPravidlo.Strediska[i].procenta;
}
    
    celkovePenez -= odecist;
    if (celkovePenez > 0) {
        for (let i = 0; i < MockPravidlo.Strediska; i++) {
            if (MockPravidlo.Strediska[i].zbytek == true) {
                zauctovani[MockPravidlo.Strediska[i].klic] += celkovePenez
            }
    }
    }

    return zauctovani;
}

}


export default RozuctovaniFaktury;