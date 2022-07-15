/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navItem = document.querySelectorAll('.nav__item'),
      navClose = document.getElementById('nav-close');

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-sidebar');
  })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-sidebar');
  })
}

navItem.forEach(item => {
  item.addEventListener('click', () => {
    if(window.innerWidth < 1024){
    navMenu.classList.remove('show-sidebar');
    }
  })
})


/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = document.querySelector(tab.dataset.target);

          tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills__active')
          })

          target.classList.add('skills__active')


          tabs.forEach(tab => {
            tab.classList.remove('skills__active')
          })

          tab.classList.add('skills__active')

        })
      })

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card'
  },
  animation: {
    duration: 300
  }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
  linkWork.forEach(l=> l.classList.remove('active-work'))
  this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener('click', activeWork))

/*===== Work Popup =====*/
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('work__button')) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
})

function togglePortfolioPopup() {
  document.querySelector('.portfolio__popup').classList.toggle('open');
}

document.querySelector('.portfolio__popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  document.querySelector('.pp__thumbnail img').src = portfolioItem.querySelector('.work__img').src;
  document.querySelector('.portfolio__popup-subtitle span').innerHTML = portfolioItem.querySelector('.work__title').innerHTML;
  document.querySelector('.portfolio__popup-body').innerHTML = portfolioItem.querySelector('.portfolio__item-details').innerHTML;
}
/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
      modelBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick) {
  modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) => {
  modelBtn.addEventListener('click', () => {
    modal(i)
  })
})

modalCloses.forEach(modalClose => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach(modalView => {
      modalView.classList.remove('active-modal')
    })
  })
});

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll('.input');

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add('focus');
}

function blurFunc() {
  let parent = this.parentNode;
  if(this.value == '') {
    parent.classList.remove('focus');
  }
}


inputs.forEach(input => {
  input.addEventListener('focus', focusFunc);
  input.addEventListener('blur', blurFunc);
})
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// get all sections that have an id defined
const sections = document.querySelectorAll('section[id]');

//add an event listener listening for scroll
window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
  // get current scroll position
  let scrollY = window.pageYOffset;
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute('id');
    /* - If our current scroll position enters the space where current section on screen is, add .active class to
    corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through
    sections as an selector */
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}

/*=============== SHOW SCROLL UP ===============*/
window.addEventListener('DOMContentLoaded', function() {
  const scrollToTop = document.querySelector('.scroll-top');

  if (scrollToTop) {
    scrollToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth',
      });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const elHeight = document.querySelector('.qualification').getBoundingClientRect();
        const elPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrolled >= elHeight.top + elPosition) {
          scrollToTop.classList.add('scroll-show');
        } else {
          scrollToTop.classList.remove('scroll-show');
        }
    });
  }
});

/*=============== FORM ===============*/
const form = document.getElementById('form');

const message = {
  loading: 'assets/img/spinner-alt.svg',
  success: 'Thanks for sending mail',
  failure: 'Error'
};

const messageTitle = {
  loading: 'Wait, please. Sending in progress',
  success: 'I will contact you shortly',
  failure: 'Something going wrong'
};


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status-loading');
  statusMessage.innerHTML = `
    <i class="uil uil-spinner-alt"></i>
  `;

  const thanksModal = document.querySelector('.contact__modal');

  function showThanks(message, messageTitle) {
    thanksModal.classList.add('send-form');

    thanksModal.innerHTML = `
      <div class="contact__modal-content">
        <i class="uil uil-times contact__modal-close" data-close></i>

        <h3 class="contact__modal-title">${message}</h3>
        <p class="contact__modal-description">${messageTitle}</p>
      </div>
    `;
    
    closeThanks();
  };

  function closeThanks() {
    thanksModal.addEventListener('click', (e) => {
      if (e.target === thanksModal || e.target.getAttribute('data-close') == '') {
        thanksModal.classList.remove('send-form');
      }
    });
  };

  const formData = new FormData(form);

  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  let error = formValidate(form);

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');
  
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      
      formRemoveError(input)
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
  
      if (input.classList.contains('_phone')) {
        if (telTest(input)) {
          formAddError(input);
          error++;
        }
      }
    }
  
    return error;
  }

  //add error class
  function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
  }
  //remove error class
  function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
  }
  //check email valid
  function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  
  // check phone valid
  function telTest(input) {
    return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
  }

  if (error === 0) {
    form.append(statusMessage);
    fetch('sendmail.php', {
      method: "POST",
      body: formData
    })
    .then(() => {
        showThanks(message.success, messageTitle.success);
        form.reset();
    }).catch(() => {
        showThanks(message.failure, messageTitle.failure);
    }).finally(() => {
        setTimeout(() => {
          thanksModal.classList.remove('send-form');
        }, 4000);
        statusMessage.remove();
    })
  }
});
