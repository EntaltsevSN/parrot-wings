$(function() {
  function getProducts(query = '') {
    $.get( "products.json", function( data ) {
      data = (query.length > 0) ? data.products.filter(item => item.title.toLowerCase().includes(query)) : data.products

      function mapData(isHidden = false) {
          return data.map(({id, title, image, meta, popupTitle, popupText}) => (`<li class="products__item ${isHidden ? ` products__item--hidden` : ``}">
          <img src="${image}" alt="" class="products__image">
          <p class="products__meta">${meta}</p>
          <h4 class="products__name">${title}</h4>
          <section class="products__nav">
            <a href="#product-${id}" class="btn btn--primary products__button">Order</a>
            <div class="popup products__popup">
              <h5 class="popup__title">${popupTitle}</h5>
              <section class="popup__body">${popupText}</section>
            </div>
          </section>
        </li>`)).join('');
      }

      let result = mapData() + mapData(true);

      $('[data-products]').html(result)
    });
  }

  setTimeout(function() {
    $('[data-overlay]').hide()
  }, 3000);

  $('[data-connect]').on('click', function() {
    $(this).attr('disabled', true);

    var lines = [
      { id: 1, delay: 0 },
      { id: 2, delay: 2000 },
      { id: 3, delay: 4000 },
      { id: 4, delay: 6000 }
    ]

    lines.map(({ id, delay }) => { 
      setTimeout(() => { $(`[data-line=${id}]`).css('visibility', 'visible') }, delay) 
    })

    setTimeout(function () { $('[data]') })
  });

  getProducts()

  $('[data-search]').on('input', function(e) {
    (e.target.value.length > 0) 
      ? $(this).parent().addClass('form__group--magnifier') 
      : $(this).parent().removeClass('form__group--magnifier')
    getProducts(e.target.value);
  })

  $('[data-form]').on('submit', e => {
    e.preventDefault();

    var target = e.target;

    alert(`Hello, ${target[0].value} ${target[1].value} (${target[2].value})! You're succesfully registered!`);
  })
  
  $('[data-toggle-menu]').on('click', e => {
    e.preventDefault();

    $('[data-menu]').toggleClass('header__nav--is-visible');
  })

  $('[data-toggle-search]').on('click', e => {
    e.preventDefault();

    console.log(e)

    $('[data-form]').toggleClass('form--visible');
  })
});