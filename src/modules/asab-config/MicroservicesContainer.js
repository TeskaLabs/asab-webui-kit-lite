import React, { useState, useEffect } from 'react';

import { Container } from 'reactstrap';

import { DataTable } from 'asab-webui';

import "./microservices.css";

export default (props) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    const headers = [ 
        { name: 'Name', key: 'appclass', link: { key: "name", pathname: "/config/svcs/" } },
        { name: 'Launch time', key: 'launchtime', datetime: true },
        { name: 'Host', key: 'hostname' },
        { name: "Errors", key: 'pipelines_reloaded' }
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
