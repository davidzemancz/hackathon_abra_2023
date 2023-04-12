import * as React from 'react';
import { Box } from "@mui/material";
import { DataGridPro, GridRow, GridColumnHeaders } from '@mui/x-data-grid-pro';

import { Pravidla } from "./MockPravidla";


const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);


function SeznamPravidel()
    {
        return (
            <Box sx={{ height: 520, width: '100%' }}>
              <DataGridPro
                {...Pravidla}
                loading={Pravidla.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                disableRowSelectionOnClick
                components={{
                  Row: MemoizedRow,
                  ColumnHeaders: MemoizedColumnHeaders,
                }}
              />
            </Box>
          );
    
    }
   
   


export default SeznamPravidel;