import React, {useEffect, useState} from 'react';
import styles from './slider.module.css';

const containerStyle = (imageSize,width) => ({
    height: `${(imageSize ? imageSize : 400) + imageSize*90/100}px`,
    width: `${width}px` || "100%"
});

const getTranslateStyle = (translateX) =>({ transform: `translateX(${translateX})` });


/**
 * There is three props
 * "images" is array of image's src
 * "width" as number which maintain width of slider and size of image
 * "focusCenter" is boolean which focus and zoom image) 
 */
const Slider = ({images, width = 500, focusCenter=true}) => {

    const imageSize = (width*33.33) / 100;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const lastIndex = images.length - 2;
            return prevIndex === -1 ? lastIndex : prevIndex - 1;
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const lastIndex = images.length - 2;
            return prevIndex === lastIndex ? -1 : prevIndex + 1;
        });
    };

    useEffect(() => {
        setTranslateX(-currentIndex * (100 / 3) + '%');
    },[currentIndex]);

    return (
        <div style={containerStyle(imageSize,width)}>
            <div className={styles['slider-container']}>
                <div className={styles.slider} style={getTranslateStyle(translateX)}>
                    {
                        images?.map((image, index) =>(
                            <div className={`${styles.slide} ${index === currentIndex+1 ? styles['center-slide'] : ''} ${(focusCenter && index === currentIndex+1) ? styles['focus-center-img'] : ''}`}>
                                <img src={image} alt={image[index]} className={styles.sliderImg}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <button className={styles['slider-button']} onClick={prevSlide}>&#10094;</button>
                <button className={styles['slider-button']} onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
    );
};

export default Slider;