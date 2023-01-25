function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //  ======================= Слайдер=========================================

    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;

    let sliderIndex = 1;
    let offset = 0;
    // ----------------------------простой вариант------
    // showSlides(sliderIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else
    // {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if (n > slides.length) {
    //         sliderIndex = 1;
    //     }
    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.classList.add('hide'));

    //     slides[sliderIndex-1].classList.remove('hide');

    //     if (slides.length < 10) {
    //         current.textContent = `0${sliderIndex}`;
    //     } else
    //     {
    //         current.textContent = sliderIndex;
    //     }
    // }


    // function plusSlides(n){
    //     showSlides(sliderIndex +=n);
    // }

    // prev.addEventListener('click', ()=>{
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', ()=>{
    //     plusSlides(+1);
    // });

    // ---------------------сложный вариант c точками---------
   


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }



    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    const dotsArray = [];
    dots.classList.add('carousel-indicators');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slider-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArray.push(dot);
    }

    function deleteNonDigits(str) {
        return (+str.replace(/\D/g, ''));
    }

    next.addEventListener('click', () => {
        if (offset == deleteNonDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNonDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;


        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }

        dotsArray.forEach(dot => dot.style.opacity = '.5');
        dotsArray[sliderIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNonDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNonDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }

        dotsArray.forEach(dot => dot.style.opacity = '.5');
        dotsArray[sliderIndex - 1].style.opacity = '1';
    });


    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slider-to');
            sliderIndex = slideTo;
            offset = deleteNonDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${sliderIndex}`;
            } else {
                current.textContent = sliderIndex;
            }

            dotsArray.forEach(dot => dot.style.opacity = '.5');
            dotsArray[sliderIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;