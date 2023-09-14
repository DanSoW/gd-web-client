import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

const CircularIndeterminate = () => {
    const matches1 = useMediaQuery('only screen and (min-width: 320px) and (max-width: 480px)');
    const matches2 = useMediaQuery('only screen and (min-width: 480px) and (max-width: 768px)');
    const matches3 = useMediaQuery('only screen and (min-width: 768px) and (max-width: 992px)');

    return (
        <Box sx={
            (matches1 || matches2 || matches3)? boxMobileStyle : boxDesktopStyle
        }>
            <CircularProgress size={70} style={{
                color: 'green'
            }}/>
        </Box >
    );
}

const boxDesktopStyle = {
    width: 70,
    height: 70,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: 'translate(-50%, -50%)',
    zIndex: 1
}

const boxMobileStyle = {
    width: 70,
    height: 70,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: 'translate(-50%, -50%)',
    zIndex: 1
}

export default React.memo(CircularIndeterminate);