import './Gallery.css';

import React from 'react';
import gallery_1 from '../../assets/gallery-1.png';
import gallery_2 from '../../assets/gallery-2.png';
import gallery_3 from '../../assets/gallery-3.png';
import gallery_4 from '../../assets/gallery-4.png';
import { useNavigate } from 'react-router-dom';
import white_arrow from '../../assets/white-arrow.png';

const Gallery = () => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate('/gallery-full', {
      state: {
        viewedImages: [gallery_1, gallery_2, gallery_3, gallery_4],
      },
    });
  };

  return (
    <div className='campus'>
      <div className='gallery'>
        <img src={gallery_1} alt='Gallery 1' />
        <img src={gallery_2} alt='Gallery 2' />
        <img src={gallery_3} alt='Gallery 3' />
        <img src={gallery_4} alt='Gallery 4' />
      </div>
      <button className='btn dark-btn' onClick={handleSeeMore}>
        See More Here <img src={white_arrow} alt='Arrow' />
      </button>
    </div>
  );
};

export default Gallery;