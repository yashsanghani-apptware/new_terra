import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "../../utils/BackgroundImageRatio";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getAPIData } from "@/utils/getData";
import { BASE_URL } from "@/config/apiBaseUrls";
import { useSearchParams } from "next/navigation";
import NumberFormatter from "@/utils/NumberFormatter";

const Breadcrumb2 = ({ right, data, kpisFlag }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const offeringDetails = JSON.parse(searchParams?.get("offerDetails"));
  const [offeringData, setOfferingData] = useState();

  useEffect(() => {
    if (offeringDetails.offering_id)
      getOfferingData(offeringDetails.offering_id);
  }, []);

  const getOfferingData = async (offeringId) => {
    const data = await getAPIData(
      `${BASE_URL.OFFERING}/offerings/${offeringId}`
    );
    if (data.Offering) {
      setOfferingData(data.Offering);
    }
  };

  const kpis = [];

  offeringData?.details?.offering_size &&
    kpis.push({
      label: "Offering Size",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.offering_size)}
          locale="en-US"
        />
      ),
    });

  offeringData?.details?.target_net_irr &&
    kpis.push({
      label: "Target Net IRR",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.target_net_irr)}
          locale="en-US"
        />
      ),
    });

  offeringData?.details?.target_net_cash_yield &&
    kpis.push({
      label: "Target Net Cash Yield",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.target_net_cash_yield)}
          locale="en-US"
        />
      ),
    });

  offeringData?.details?.target_net_moic &&
    kpis.push({
      label: "Target Net MOIC",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.target_net_moic)}
          locale="en-US"
        />
      ),
    });

  offeringData?.details?.target_hold &&
    kpis.push({
      label: "Target Hold",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.target_hold)}
          locale="en-US"
        />
      ),
    });

  offeringData?.details?.target_net_ltv_ratio &&
    kpis.push({
      label: "Target Net LTV Ratio",
      value: (
        <NumberFormatter
          value={Number(offeringData?.details?.target_net_ltv_ratio)}
          locale="en-US"
        />
      ),
    });

  return (
    <>
      <section className="breadcrumb-section p-0">
        <Img
          src="/assets/images/inner-background-new.jpg"
          className="bg-img img-fluid"
          alt=""
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />

        <Container style={{ maxWidth: "100%" }}>
          <div
            className={`breadcrumb-content ${right ? "breadcrumb-right" : ""} ${kpisFlag ? "kpi-content" : ""}`}
            
          >
            <Row className="kpi-row" style={kpisFlag ? { width: "90%", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "24px 12px" } : {}}>
              {kpisFlag && kpis.map((kpi, index) => (
                <Col key={index} xs="6" sm="4" md="2" className="kpi-col">
                  <div className="kpi-text">
                    <h3 className="kpi-value">{kpi.value}</h3>
                    <h5 className="kpi-label">{kpi.label}</h5>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Breadcrumb2;
