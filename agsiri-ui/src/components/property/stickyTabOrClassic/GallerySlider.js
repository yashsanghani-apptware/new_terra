import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { galleryFor, galleryNav } from "../../../data/slickSlider";
import Img from "../../../utils/BackgroundImageRatio";
import NoSsr from "../../../utils/NoSsr";
import { Camera } from "react-feather";


const GallerySlider = ({ images }) => {
  const slider1 = useRef(null); // Use useRef instead of useState
  const slider2 = useRef(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (slider1.current && slider2.current) {
      setInitialized(true);
    }
  }, [slider1.current, slider2.current]);


  return (
    <NoSsr>
      {images && images.length > 0 && (
        <>
          <Slider
            className="gallery-for"
            {...galleryFor}
            asNavFor={slider2.current}
            ref={slider1}
          >
            {images.map((data, i) => (
              <div key={i}>
                <div>
                  <Img src={data.url} className="bg-img" />
                </div>
              </div>
            ))}
          </Slider>
          {images ? <>
            <div className="galleryImgIcon">
              <Camera /> <span>{images?.length}</span>
            </div> </> : ""}

          {/* Navigation Slider */}
          <Slider
            className="gallery-nav p-1"
            {...galleryNav}
            asNavFor={slider1.current}
            ref={slider2}
          >
            {images.map((data, i) => (
              <div key={i}>
                <div>
                  <Img className="img-fluid bg-img" src={data.url} />
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </NoSsr>
  );
};

export default GallerySlider;