import { useParams } from 'react-router-dom';

export default function WhatWant () {

    const { lang } = useParams();

    return(
        <>
        
        {lang}
        </>
    )
}