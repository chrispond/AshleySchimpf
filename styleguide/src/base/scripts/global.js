/**
 *@name Global Scripts
 *@file This brings all the scripts together, to be used.
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */

// COMPONENT SCRIPTS
import { CpCarousel } from '../../components/carousel/scripts';
import { CpTrimParagraph } from '../../components/trim-paragraph/scripts';
import { CpTrimString } from '../../components/trim-string/scripts';
import { InViewAnimate } from '../../components/shadow/scripts';

// GLOBAL OBJECTS
window.CpCarousel = CpCarousel;
window.CpTrimParagraph = CpTrimParagraph;
window.CpTrimString = CpTrimString;

//Carousel Initialization
const cpCarousels = document.querySelectorAll('.cp-carousel');
const cpCarouselsLength = cpCarousels.length;

const cpCarouselOptionsHandler = (carouselWidth) => {
  if (carouselWidth <= 480) {
    return { slidesInView: 1, isInfinit: false };
  } else if (carouselWidth > 480 && carouselWidth <= 960) {
    return { slidesInView: 2.5, isInfinit: true };
  }

  return { slidesInView: 3.5, isInfinit: true };
};

const addCarouselControls = (element, carousel) => {
  const prevButton = element.querySelector('.cp-carousel-prev');
  const nextButton = element.querySelector('.cp-carousel-next');

  prevButton.addEventListener('click', () => {
    carousel.onPrevious();
  });
  nextButton.addEventListener('click', () => {
    carousel.onNext();
  });
};

if (cpCarouselsLength > 0) {
  for (let i = 0; i < cpCarouselsLength; i++) {
    const carouselElement = cpCarousels[i];
    const a11yLive = carouselElement.querySelector('.cp-carousel-a11y-live');
    const carouselElementWidth = carouselElement.clientWidth;
    const carousel = new CpCarousel(
      carouselElement,
      cpCarouselOptionsHandler(carouselElementWidth)
    );

    // Add Next/Previous toggle controls
    addCarouselControls(carouselElement, carousel);

    // Handle carousel callback functions
    carousel.onSlideStop((slide) => {
      const { slideElement } = slide;

      // i18n: Announce slide update
      const slideLabel = slideElement.getAttribute('aria-label');
      a11yLive.textContent = slideLabel;
    });

    // Update carousel options onResize
    let updateCarousel;

    window.addEventListener('resize', () => {
      clearTimeout(updateCarousel);
      updateCarousel = setTimeout(() => {
        const itemWidth = carouselElement.clientWidth;
        carousel.updateOptions(cpCarouselOptionsHandler(itemWidth));
      }, 1000);
    });
  }
}

//Trim Paragraph Initialization
const cpTrimmedParagraphs = document.querySelectorAll('.cp-trim-paragraph');
const cpTrimmedParagraphsLength = cpTrimmedParagraphs.length;

if (cpTrimmedParagraphsLength > 0) {
  for (let i = 0; i < cpTrimmedParagraphsLength; i++) {
    const item = cpTrimmedParagraphs[i];
    new CpTrimParagraph(item, 150);
  }
}

//Trim String Initialization
const cpTrimmedStrings = document.querySelectorAll('.cp-trim-string');
const cpTrimmedStringsLength = cpTrimmedStrings.length;

if (cpTrimmedStringsLength > 0) {
  for (let i = 0; i < cpTrimmedStringsLength; i++) {
    const item = cpTrimmedStrings[i];
    new CpTrimString(item);
  }
}

//Shadow Initialization
const shadowElements = document.querySelectorAll('.shadow');
const shadowElementsLength = shadowElements.length;
const animateData = {
  animateFocus: {
    opacity: 0.2,
    rotate: 0.015,
  },
  animateInData: {
    opacity: 0.1,
    rotate: 0,
  },
  animateOutData: {
    opacity: 0.1,
    rotate: 0,
  },
  units: {
    rotate: 'turn', // deg, turn, rad
    translateX: '%', // %, px, rem, em
    translateY: '%', // %, px, rem, em
  },
  startAnimate: 0.2,
  finishAnimate: 1,
  focusAnimate: 0.25,
};

if (shadowElementsLength > 0) {
  for (let i = 0; i < shadowElementsLength; i++) {
    const item = shadowElements[i].querySelector('.shadow-box');
    new InViewAnimate(item, animateData);
  }
}
