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
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { svc_name } = useParams();

    const ASABConfigAPI = props.app.axiosCreate('asab_config');

    useEffect(() => {
        ASABConfigAPI.get(`microservices/${svc_name}`)
            .then(res => res.data)
            .then(svc => {
                if (svc == null) {
                    props.app.addAlert("warning", t("MicroserviceDetailContainer|This microservice doesn't exist"));
                    setError("This microservice doesn't exist");
                }
                else {
                    setSvc(svc);
                }
            })
            .catch(e => {
                props.app.addAlert("warning", t('Failed fetch'));
                console.error(e);
                setError("Something went wrong and this microservice wasn't found")
            });
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <CardHeader>{svc?.appclass}</CardHeader>
                        <CardBody>
                            {error ? (
                                    <div className="text-center">
                                        <h5>{t(`MicroserviceDetailContainer|${error}`)}</h5>
                                    </div>
                                ) : (
                                <>
                                    <Row>
                                        <Col md={3}>{t("MicroserviceDetailContainer|ID")}</Col>
                                        <Col>{svc_name}</Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col md={3}>{t("MicroserviceDetailContainer|Host")}</Col>
                                        <Col>{svc?.hostname}</Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col md={3}>{t("MicroserviceDetailContainer|Launch time")}</Col>
                                        <Col>
                                            <DateTime value={svc?.launchtime} />
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {svc && (
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <CardHeader>{t("MicroserviceDetailContainer|Detail")}</CardHeader>
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