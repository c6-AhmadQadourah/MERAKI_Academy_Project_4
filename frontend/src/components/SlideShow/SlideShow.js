
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import "./SlideShow.css"
import { useEffect, useState, useContext } from "react";
import {AuthContext} from "../Contexts/context";
import axios from "axios"
import {Navigate, useNavigate} from "react-router-dom"



  

const Slideshow = () => {
  const navigate=useNavigate()

 
  const { token ,change1  } = useContext(AuthContext);
    const { setOriginalData , isAdmin ,originalData  } = useContext(AuthContext);

    const fadeImages = [
      {
        url: 'https://s.alicdn.com/@sc04/kf/U167837189e664811b3026798bc8a47d8f.jpg_960x960.jpg',
        caption: 'Slide 1',
        url2 :"https://s.alicdn.com/@sc04/kf/Hbd9931e3e8984e1385cb98a7da584fa7s.jpg_960x960.jpg",
        url3 :"https://s.alicdn.com/@sc04/kf/H6dbba2a7043a4c2e9d8f572410762206u.jpg_960x960.jpg"
        
      },
      {
        url: 'https://s.alicdn.com/@sc04/kf/U34061dcb9595446ba2ac7f920baf381ak.jpg_960x960.jpg',
        url2 :"https://s.alicdn.com/@sc04/kf/U5f263ca256e34c8a97201a4024b1ccedE.jpg_960x960.jpg",
        url3 :"https://s.alicdn.com/@sc04/kf/A02fb4e877eca42e691807c4045e74af5a.jpg_960x960.jpg",
        caption: 'Slide 2'
      },
      {
        url: 'https://s.alicdn.com/@sc04/kf/A063b9e6f19dd4c74bd244e23b0fb722bt.jpg_960x960.jpg',
        url2 :"https://s.alicdn.com/@sc04/kf/A02d8ca560cc24f9091fe4521ed6299f6a.png_960x960.png",
        url3 :"https://s.alicdn.com/@sc04/kf/Ad57f8cd253ac49e0934883412e9b812cW.jpg_960x960.jpg",
        caption: 'Slide 3'
      },
    ];

    return (
      <div className="slide-container">
        <Fade >
          {fadeImages&& fadeImages.map((fadeImage, index) => (
            <div  className="each-fade" key={index}>
              <div  className="image-container">
                <img className='imagee'  src={fadeImage.url} />
                <img className='imagee'  src={fadeImage.url2}/>
                <img className='imagee'  src={fadeImage.url3}/>
              </div>
            
            </div>
          ))}
        </Fade>
      </div>
    )
  }
export default Slideshow