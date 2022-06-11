/* eslint-disable indent */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

export default function BasicCard(props: any) {
    return (
        <Card
            sx={{
                maxWidth: 275,
                position: 'absolute',
                zIndex: 1000,
                margin: '10px',
                top: props.top,
                left: props.left
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Star Index
                </Typography>
                <CardMedia
                    style={{ paddingBottom: '5px' }}
                    component="img"
                    image={'https://upload.wikimedia.org/wikipedia/commons/7/73/25_solar_system_objects_smaller_than_Earth.jpg'}
                    alt={'star'}
                    height="140"
                    title={'star'}
                />
                <Typography variant="body2">
                    {props.index}
                </Typography>
            </CardContent>
        </Card>
    );
}
