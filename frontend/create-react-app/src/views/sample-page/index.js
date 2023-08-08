// material-ui
import {Typography} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, {useEffect, useState} from 'react';
import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {

    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/samplepage')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                <div>
                    백엔드에서 가져온 데이터입니다 : {hello}
                </div>
            </Typography>
        </MainCard>);
};

export default SamplePage;
