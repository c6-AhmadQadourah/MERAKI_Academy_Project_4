
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import "./SlideShow.css"

const fadeImages = [
  {
    url: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg',
    caption: 'Slide 1'
  },
  {
    url: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Fade >
          {fadeImages.map((fadeImage, index) => (
            <div  className="each-fade" key={index}>
              <div  className="image-container">
                <img className='imagee'  src={fadeImage.url} />
              </div>
              <h2>{fadeImage.caption}</h2>
            </div>
          ))}
        </Fade>
      </div>
    )
  }
export default Slideshow