import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { 
    Container, Card, CardBody, 
    CardHeader, CardFooter,
    Col, Row
 } from 'reactstrap';
import { DateTime } from 'asab-webui';

const MicroserviceDetailContainer = (props) => {
    const [svc, setSvc] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        // ASABConfigAPI.get('microservices').
        //     then(res => res.data.find(svc => svc.appclass === svcs_id)).
        //     then(svc => setSvc(svc)).
        //     catch(e => props.app.addAler)
        setSvc({
            "name": "ASABConfigApplication.0000000101",
            "appclass": "ASABConfigApplication",
            "launchtime": "2021-06-24T10:43:51.885514",
            "hostname": "DZMITRYs-Air.teskalabs.int",
            "reloading_pipelines_exception": "Pipeline failed due to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut venenatis tortor. Vivamus a enim id diam laoreet elementum quis eu dolor. Curabitur tincidunt orci non turpis accumsan volutpat a sed eros. Quisque vel placerat quam, non faucibus leo. Morbi mollis, urna non molestie gravida, metus nisi cursus nisl, sit amet ornare sapien leo et velit. Fusce ac ultrices mi. Duis fermentum viverra iaculis. Ut gravida felis felis, a faucibus dolor viverra at. Donec tempus lacinia ligula at ullamcorper. Duis iaculis condimentum tristique.",
            "pipelines_reloaded": true
        })
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <CardHeader>{svc?.name}</CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={3}>{t("MicroserviceDetailContainer|Launch time")}</Col>
                                <Col>
                                    <DateTime value={svc?.launchtime} />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={3}>{t("MicroserviceDetailContainer|Host")}</Col>
                                <Col>{svc?.hostname}</Col>
                            </Row>

                            { svc?.pipelines_reloaded && (
                                <Row className="mt-3">
                                    <Col md={3}>{t("MicroserviceDetailContainer|Pipelines reloaded")}</Col>
                                    <Col>True</Col>
                                </Row>)
                            }
                        </CardBody>
                    </Card>
                </Col>
                { svc?.reloading_pipelines_exception && (
                    <Col md={6}>
                        <Card>
                            <CardHeader>{t("MicroserviceDetailContainer|Reloading pipelines exception")}</CardHeader>
                            <CardBody className="alert alert-danger mb-0">
                                <Row className="m-auto">
                                    <code
                                        style={{
                                            width: "100%",
                                            overflow: "visible",
                                            wordBreak: "break-word" 
                                        }}
                                    >
                                        {svc?.reloading_pipelines_exception}
                                    </code>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default MicroserviceDetailContainer;