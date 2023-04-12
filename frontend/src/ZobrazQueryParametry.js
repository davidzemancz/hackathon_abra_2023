import { Box } from "@mui/material";
import { useSearchParams } from 'react-router-dom'


function ZobrazQueryParametry(){

    const [searchParams, setSearchParams] = useSearchParams()

    localStorage.setItem("authSessionId", searchParams.get('authSessionId'));
    localStorage.setItem("companyUrl", searchParams.get('companyUrl'));
    localStorage.setItem("objectId", searchParams.get('objectId'));
    localStorage.setItem("objectIds", searchParams.get('objectIds'));

    return (
        <Box>
            <ul>
                <li>authSessionId: {searchParams.get('authSessionId')}</li>
                <li>companyUrl: {searchParams.get('companyUrl')}</li>
                <li>objectId: {searchParams.get('objectId')}</li>
                <li>objectIds: {searchParams.get('objectIds')}</li>
            </ul>
        </Box>
    )

    
}

export default ZobrazQueryParametry;