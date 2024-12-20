import React, { Fragment, useEffect, useState } from "react";
import { Container } from "reactstrap";
import Img from "../../utils/BackgroundImageRatio";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({ right, customStyle, showPath }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(pathname.split("/"));
  }, [router.pathname]);
  return (
    <>
      <section
        className={
          customStyle
            ? "breadcrumb-section p-0 breadcrumb-section-p-0-1"
            : "breadcrumb-section p-0"
        }
      >
        <Img
          src="/assets/images/inner-background-new.jpg"
          className="bg-img img-fluid"
          alt=""
        />
        {customStyle ? (
          <Container>
            <div
              className={`breadcrumb-content ${
                right ? "breadcrumb-right" : ""
              }`}
            >
              <div>
                <h2>{path && path[path.length - 1].replaceAll("-", " ")}</h2>
                <nav aria-label="breadcrumb" className="theme-breadcrumb">
                  <ol className="breadcrumb">
                    {path?.map((data, i) => (
                      <Fragment key={i}>
                        {data && (
                          <Link href={`/${data}`} className="breadcrumb-item">
                            <span>{data.replaceAll("-", " ")}</span>
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </Container>
        ) : (
          <Container>
            <div
              className={`breadcrumb-content ${
                right ? "breadcrumb-right" : ""
              }`}
            >
              <div>
                <h2>{path && path[path.length - 1].replaceAll("-", " ")}</h2>
              </div>
            </div>
          </Container>
        )}
      </section>
      {!customStyle && (
        <Container>
          <div
            className={`breadcrumb-content ${right ? "breadcrumb-right" : ""}`}
          >
            {/* <h2>{path && path[path.length - 1].replaceAll("-", " ")}</h2> */}
            <nav aria-label="breadcrumb" className="theme-breadcrumb">
              <ol className="breadcrumb">
                {!showPath && path?.length > 2 &&
                  !path?.includes("login") &&
                  path?.map((data, i) => (
                    <Fragment key={i}>
                      {data && (
                        <Link href={`/${data}`} className="breadcrumb-item">
                          <span>{data.replaceAll("-", " ")} </span>
                        </Link>
                      )}
                    </Fragment>
                  ))}
              </ol>
            </nav>
          </div>
        </Container>
      )}
    </>
  );
};

export default Breadcrumb;
