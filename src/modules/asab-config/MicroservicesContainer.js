import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.css";

export default (props) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    const { t } = useTranslation();

    const headers = [ 
        { name: t('MicroservicesContainer|Name'), key: 'appclass', link: { key: "name", pathname: "/config/svcs/" } },
        { name: t('MicroservicesContainer|Launch time'), key: 'launchtime', datetime: true },
        { name: t('MicroservicesContainer|Host'), key: 'hostname' }
    ];
    const limit = 10;

    useEffect(() => {
        const parseDataIntoArr = (data) => {
            return Object.keys(data).map(name => {
                const item = data[name];
                return {
                    ...item,
                    name: name,
                    ip: item.web[0][0]
                };
            });
        };

        const ASABConfigAPI = props.app.axiosCreate('asab_config');

        ASABConfigAPI.get('/microservices')
            .then(res => setList(parseDataIntoArr(res.data)))
            .catch(e => {
                console.error(e);
                props.app.addAlert("warning", t('Failed fetch'));
            })
    }, []);

    return (
        <Container>
            <DataTable 
                headers={headers}
                data={list.slice((page-1)*limit, limit*page)}
                page={page}
                setPage={setPage}
                count={list.length}
                limit={limit}
                title={{
                    text: "Microservices"
                }}
            />
        </Container>
    )
}
