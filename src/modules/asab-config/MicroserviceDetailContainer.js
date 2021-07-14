import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { 
    Container, Card, CardBody, 
    CardHeader, Col, Row
 } from 'reactstrap';
import { DateTime } from 'asab-webui';
import ReactJSON from 'react-json-view';

const MicroserviceDetailContainer = (props) => {
    const [svc, setSvc] = useState(null);
    const { t } = useTranslation();
    const { svc_name } = useParams();

    const ASABConfigAPI = props.app.axiosCreate('asab_config');

    useEffect(() => {
        ASABConfigAPI.get(`microservices/${svc_name}`)
            .then(svc => setSvc(svc.data))
            .catch(e => props.app.addAlert(t("warning", t('Failed fetch'))));
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <CardHeader>{svc_name}</CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={3}>{t("MicroserviceDetailContainer|Name")}</Col>
                                <Col>{svc?.appclass}</Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={3}>{t("MicroserviceDetailContainer|Launch time")}</Col>
                                <Col>
                                    <DateTime value={svc?.launchtime} />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={3}>{t("MicroserviceDetailContainer|Host")}</Col>
                                <Col>{svc?.hostname}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {svc && (
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <CardHeader>JSON</CardHeader>
                            <CardBody>
                                <Row className="m-auto" >
                                    <Col>
                                        <ReactJSON
                                            src={svc}
                                            name={false}
                                            enableClipboard={false}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default MicroserviceDetailContainer;