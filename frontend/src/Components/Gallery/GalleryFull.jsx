import './GalleryFull.css';

import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';
import { X } from 'lucide-react'; // You can also use a custom icon or image
import gallery10 from '../../assets/gallery-10.png';
import gallery11 from '../../assets/gallery-11.png';
import gallery12 from '../../assets/gallery-12.png';
import gallery13 from '../../assets/gallery-13.png';
import gallery14 from '../../assets/gallery-14.png';
import gallery15 from '../../assets/gallery-15.png';
import gallery16 from '../../assets/gallery-16.png';
import gallery17 from '../../assets/gallery-17.png';
import gallery18 from '../../assets/gallery-18.png';
import gallery19 from '../../assets/gallery-19.png';
import gallery5 from '../../assets/gallery-5.png';
import gallery6 from '../../assets/gallery-6.png';
import gallery7 from '../../assets/gallery-7.png';
import gallery8 from '../../assets/gallery-8.png';
import gallery9 from '../../assets/gallery-9.png';
import { useEffect } from 'react';

const GalleryFull = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viewedImages = [] } = location.state || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const moreImages = [
    ...viewedImages,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
    gallery13,
    gallery14,
    gallery15,
    gallery16,
    gallery17,
    gallery18,
    gallery19,
  ];

  return (
    <div className='gallery-full-container'>
      <button className='close-button' onClick={() => navigate(-1)}>
        <X size={20} />
      </button>
      <h2>Full Gallery</h2>
      <div className='gallery-grid'>
        {moreImages.map((img, idx) => (
          <img src={img} alt={`Gallery ${idx + 1}`} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default GalleryFull;