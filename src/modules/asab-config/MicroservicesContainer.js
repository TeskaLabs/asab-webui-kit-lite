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
        { name: t('MicroservicesContainer|Host'), key: 'hostname' },
        { 
            name: t("MicroservicesContainer|Pipelines reloaded"),
            customComponent: {
                generate: (obj) => ( 
                    obj.pipelines_reloaded ?
                    <p>True</p> :
                    <p>-</p>
                )
            }
        },
        {
            name: t("MicroservicesContainer|Reloading pipelines exception"),
            customComponent: {
                generate: (obj) => ( obj.reloading_pipelines_exception ?
                    <p
                        className="alert-danger p-1"
                        style={{
                            maxWidth: "30ch",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >{obj.reloading_pipelines_exception}</p> :
                    <p>-</p>
                )
            }
        }
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

        ASABConfigAPI.get('/microservices').
            then(res => parseDataIntoArr(res.data)).
            then(lst => setList(lst.map(i => ({...i, "pipelines_reloaded": "True", "reloading_pipelines_exception": "Pipeline failed due to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut venenatis tortor. Vivamus a enim id diam laoreet elementum quis eu dolor. Curabitur tincidunt orci non turpis accumsan volutpat a sed eros. Quisque vel placerat quam, non faucibus leo. Morbi mollis, urna non molestie gravida, metus nisi cursus nisl, sit amet ornare sapien leo et velit. Fusce ac ultrices mi. Duis fermentum viverra iaculis. Ut gravida felis felis, a faucibus dolor viverra at. Donec tempus lacinia ligula at ullamcorper. Duis iaculis condimentum tristique."}))));
    }, []);

    useEffect(() => {
        console.log(list);
    }, [list])

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
