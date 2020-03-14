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

// GLOBAL OBJECTS
window.CpCarousel = CpCarousel;
window.CpTrimParagraph = CpTrimParagraph;
window.CpTrimString = CpTrimString;

//Carousel Initialization
const cpCarousels = document.querySelectorAll('.cp-carousel');
const cpCarouselsLength = cpCarousels.length;
const cpCarouselOptionsHandler = carouselWidth => {
  if (carouselWidth <= 480) {
    return { slidesInView: 1, isInfinit: false };
  } else if (carouselWidth > 480 && carouselWidth <= 960) {
    return { slidesInView: 2.5, isInfinit: true };
  }

  return { slidesInView: 3.5, isInfinit: true };
};

if (cpCarouselsLength > 0) {
  for (let i = 0; i < cpCarouselsLength; i++) {
    const item = cpCarousels[i];
    const itemWidth = item.clientWidth;
    const test = new CpCarousel(item, cpCarouselOptionsHandler(itemWidth));

    const prevSlide = evt => {
      test.updateOptions({ slidesInView: 1, firstSlideIndex: 1 });
    };

    test.onSlideStart(slideIndex => {
      // Do Stuff
    });
    test.onSlideStop(slideIndex => {
      // Do Stuff
    });

    const prevButton = item.querySelector('.cp-carousel-prev');
    const nextButton = item.querySelector('.cp-carousel-next');

    prevButton.addEventListener('click', () => {
      test.onPrevious();
    });
    nextButton.addEventListener('click', () => {
      test.onNext();
    });

    let updateCarousel;

    window.addEventListener('resize', () => {
      clearTimeout(updateCarousel);
      updateCarousel = setTimeout(() => {
        const itemWidth = item.clientWidth;
        test.updateOptions(cpCarouselOptionsHandler(itemWidth));
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
