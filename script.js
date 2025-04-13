'use strict';

///////////////////////////////////////
// Modal window


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const slides = document.querySelectorAll('.slide')
const dots = document.querySelector('.dots')

const learnMore = document.querySelector(".btn--scroll-to");

const navBar = document.querySelector(".nav")
const navButtons = document.querySelectorAll(".nav__link");

const header = document.querySelector(".header")

const operationTabs = document.querySelectorAll(".operations__tab")
const operationContents = document.querySelectorAll(".operations__content")

const images = document.querySelectorAll('.features__img')

const allSections = document.querySelectorAll('.section')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Navbar Links Hovering And Smooth Scrolling
////////////////////////////////////////////////////////////////////////////////////////

const scrollFromTo = (from, to) => {
   from.addEventListener("click", e => {
     e.preventDefault();
    window.scrollTo({
      left: to.getBoundingClientRect().x,
      top: to.getBoundingClientRect().y + window.scrollY,
      behavior: "smooth",
    })
  })
}

scrollFromTo(learnMore, document.querySelector("#section--1"))

navButtons.forEach(button => {
  const id = button.getAttribute("href");
  scrollFromTo(button, document.getElementById(id.slice(1)))
})

navBar.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('nav__link'))
  {
    navButtons.forEach(link => {
      link.style.opacity = '0.5';
    })
    e.target.style.opacity = '1';
  }
})

navBar.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('nav__link'))
  {
    navButtons.forEach(link => {
      link.style.opacity = '1';
    })
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// Toggling Tabs And Contents
////////////////////////////////////////////////////////////////////////////////////////

const disableOperationActive = (list, activeOption) => {
  list.forEach(item => {
    if (item.classList.contains(activeOption)){
      item.classList.toggle(activeOption);
    }
  })
}

operationTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    disableOperationActive(operationTabs, "operations__tab--active")
    tab.classList.add("operations__tab--active");
    disableOperationActive(operationContents, "operations__content--active");
    operationContents.forEach(content => {
      if (content.classList.contains(`operations__content--${tab.dataset.tab}`)){
        content.classList.toggle("operations__content--active");
      }
    })
  })
})

////////////////////////////////////////////////////////////////////////////////////////
// Sticky Navbar
////////////////////////////////////////////////////////////////////////////////////////

const toggleStickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting)
  {
    navBar.classList.add('sticky')
  }
  else
  {
    navBar.classList.remove("sticky")
  }
}

const stickyNavThreshold = {
  root: null,
  threshold: 0,
  rootMargin: -navBar.getBoundingClientRect().height + "px",
}

const observerHeader = new IntersectionObserver(toggleStickyNav, stickyNavThreshold)

observerHeader.observe(header);

////////////////////////////////////////////////////////////////////////////////////////
// Section Animation
////////////////////////////////////////////////////////////////////////////////////////

const toggleSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting)
    {
      entry.target.classList.remove('section--hidden')
      observer.unobserve(entry.target)
    }
  })
}

const sectionThreshold = {
  root: null,
  threshold: [0.15],
}

const observerSection = new IntersectionObserver(toggleSection, sectionThreshold)

allSections.forEach(section => {
  observerSection.observe(section)
})

////////////////////////////////////////////////////////////////////////////////////////
// Lazy Loading Images
////////////////////////////////////////////////////////////////////////////////////////

const loadImage = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting)
    {
      console.log("here")
      entry.target.classList.remove("lazy-img")
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target)
    }
  })
}

const imageThreshold = {
  root: null,
  threshold: [.8]
}

const observerImage = new IntersectionObserver(loadImage, imageThreshold)

images.forEach(image => {
  observerImage.observe(image)
})

////////////////////////////////////////////////////////////////////////////////////////
// Slider
////////////////////////////////////////////////////////////////////////////////////////

let currSlide = 0;

const moveSlides = (slides) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currSlide)*100}%`
  })
}

slides.forEach((slide, index) => {
  const dot = document.createElement('div')
  dot.classList.add('dots__dot')
  dots.appendChild(dot)
  moveSlides(slides)
})

const btnSliderRight = document.querySelector('.slider__btn--right')
const btnSliderLeft = document.querySelector('.slider__btn--left')
const allDots = document.querySelectorAll('.dots__dot')

const updateDots = () => {
  allDots.forEach(dotInactive => {
    dotInactive.classList.remove('dots__dot--active')
  })
  allDots[currSlide].classList.add('dots__dot--active')
}

updateDots();

const prevSlide = () => {
  currSlide = (--currSlide + 3) % 3
  moveSlides(slides)
  updateDots()
}

const nextSlide = () => {
  currSlide = ++currSlide % 3;
  moveSlides(slides)
  updateDots()
}

allDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currSlide = index;
    moveSlides(slides);
    updateDots()
  })
})

btnSliderRight.addEventListener("click", nextSlide)
btnSliderLeft.addEventListener("click", prevSlide)

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
