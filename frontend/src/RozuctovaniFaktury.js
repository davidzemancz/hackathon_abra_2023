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
import { PravidlaProFakturu, List } from "./SadyPravidelAPI"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function RozuctovaniFaktury() {


    const [faktura, setFaktura] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sadyPravidel, setSadyPravidel] = useState(null);

    localStorage.setItem("authSessionId", searchParams.get('authSessionId'));
    localStorage.setItem("companyUrl", searchParams.get('companyUrl'));
    localStorage.setItem("objectId", searchParams.get('objectId'));
    localStorage.setItem("objectIds", searchParams.get('objectIds'));

    useEffect(() => {
        axios.get(`${localStorage.getItem("companyUrl")}/faktura-prijata/${localStorage.getItem("objectId")}.json?authSessionId=${localStorage.getItem("authSessionId")}`).then((response) => {
            const fak = response.data["winstrom"]["faktura-prijata"][0];
            setFaktura(fak);

            // const sp = PravidlaProFakturu(fak);
            // setSadyPravidel(sp);
            const sp = List().list;
            setSadyPravidel(sp);
        });
    }, []);


    const renderApplyButton = (params) => {
        return (
            <strong>
                <Button sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained"
                    // variant="contained"
                    // color="primary"
                    size="small"
                    //style={{ marginLeft: 16 }}
                    onClick={() => {
                        const ret = zauctovani_faktury(faktura, sadyPravidel.filter(s => s.id === params.id)[0])
                        console.log("ret", ret);
                    }}
                >
                    Použít
                </Button>
            </strong>
        )
    }

    const sadyPravidelCols = [
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
            field: 'pouzit',
            headerName: '',
            width: 150,
            renderCell: renderApplyButton,
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
        },
    ];

    if (faktura === null || sadyPravidel === null) return (<p>Načítání...</p>);
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
                        '& .MuiTextField-root': { m: 1, width: '25ch' }, textAlign: 'center'
                    }}>
                    <h3> Faktura </h3>
                    <Paper sx={{ m: 2 }} variant="outlined">
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
                </Box >
                <Paper variant="outlined" sx={{ m: 2, textAlign: 'center' }}>

                    <h5>Rozúčtování na střediska</h5>
                    <ZapoctenaFaktura rows={zauctovani_faktury(faktura, sadyPravidel[0])} />
                </Paper>
                <Button sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained">
                    Rozúčtovat fakturu
                </Button>
                <Button sx={{ m: 2, backgroundColor: '#196FCA' }} variant="contained">
                    Uložit jako novou sadu
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ m: 2, mt: 8, textAlign: 'center' }} variant="outlined">
                    <h5> Sady pravidel</h5>
                    <DataGrid autoHeight
                        rows={sadyPravidel}
                        columns={sadyPravidelCols}
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
                </Paper>
            </Grid>
        </Grid>

    )

    function zauctovani_faktury(faktura, pravidlo) {

        console.log("pravidlo");
        //console.log(pravidlo);

        // pravidlo = 
        //     { id: 1, Jméno: 'Prvni Pravidlo', View: 'Jon', Četnost: 35, pravidla:  [
        //         {stredisko: "A", castka:15, procenta:0, zbytek:true},
        //         {stredisko: "B", castka:30, procenta:0, zbytek:false},
        //         {stredisko: "C",castka:15, procenta:25, zbytek:false}]
        //     }

        var zauctovani = []
        for (let i = 0; i < pravidlo.pravidla.length; i++) {
            zauctovani.push({ id: i, castka: 0, procenta: 0, procentaCastka: 0, soucet: 0, zbytek: 0, stredisko: pravidlo.pravidla[i].stredisko });
        }
        var celkovePenez = faktura.sumCelkem;
        for (let i = 0; i < pravidlo.pravidla.length; i++) {
            zauctovani[i].castka = pravidlo.pravidla[i].castka;
            celkovePenez -= pravidlo.pravidla[i].castka;
            console.log(celkovePenez)
        }

        var odecist = 0
        for (let i = 0; i < pravidlo.pravidla.length; i++) {
            zauctovani[i].procentaCastka = celkovePenez / 100 * pravidlo.pravidla[i].procenta;
            zauctovani[i].procenta = pravidlo.pravidla[i].procenta;
            celkovePenez -= celkovePenez / 100 * pravidlo.pravidla[i].procenta;
        }

        celkovePenez -= odecist;
        for (let i = 0; i < pravidlo.pravidla.length; i++) {
            if (pravidlo.pravidla[i].zbytek == true) zauctovani[i].zbytek = celkovePenez
        }

        for (let i = 0; i < pravidlo.pravidla.length; i++) {
            zauctovani[i].soucet = zauctovani[i].castka + zauctovani[i].procentaCastka + zauctovani[i].zbytek;
        }


        zauctovani.push({ id: "SUM", soucet: faktura.sumCelkem })
        return zauctovani;

    }
}


export default RozuctovaniFaktury;