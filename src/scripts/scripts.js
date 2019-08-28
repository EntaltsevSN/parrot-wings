$(function() {

  // Update select styles
  $('select').each(function() {
    var $select = $(this);
    var $newSelect = $('<div />', { 'class': 'select' }).insertAfter($select);
    var $newValue = $('<div />', { 'class': 'select__value' }).prependTo($newSelect);
    var $newValueName = $('<span />', { 'text': $select.find('option:first').text() }).prependTo($newValue);
    var $newValueIcon = $('<i />', { 'class': 'fas fa-chevron-down' }).appendTo($newValue);
    var $newOptions = $('<div />', { 'class': 'select__options' }).appendTo($newSelect);

    $select.find('option').each(function() {
      var $option = $(this);
      var $newOption = $('<div />', {
        'class': 'select__option',
        'data-value': $option.val(),
        'text': $option.text()
      }).appendTo($newOptions);

      if($option.attr('selected') !== undefined) {
        $newValue.text($option.text());
      }

      $newOption.on('click', function() {
        var $this = $(this);

        $select.find('option[value="' + $this.data('value') + '"]').attr('selected', 'selected');
        $newValueName.text($this.text());
        $newOptions.removeClass('is-visible');
      });
    });

    $select.hide();

    $newValue.on('click', function() {
      $newOptions.toggleClass('is-visible');
    });

    $(document).mouseup(function (e) {
      if (!$newOptions.is(e.target)) {
        $newOptions.removeClass('is-visible');
      }
    });
  });

  //Update checkbox styles
  $('input[type="checkbox"]').each(function() {
    var $checkbox = $(this);
    var $newCheckbox = $('<label />', {
      'class': 'checkbox',
      'for': $checkbox.attr('id')
    }).insertAfter($checkbox);
    var $newCheckboxIcon = $('<i />', { 'class': 'fas fa-check' }).appendTo($newCheckbox);

    $checkbox.hide();
  });

  //Update radio styles
  $('input[type="radio"]').each(function() {
    var $radio = $(this);
    var $newRadio = $('<label />', {
      'class': 'radio',
      'for': $radio.attr('id')
    }).insertAfter($radio);
    var $newRadioIcon = $('<i />', { 'class': 'radio__icon' }).appendTo($newRadio);

    $radio.hide();
  });

  

  // Mobile menu
  var $mobileMenu = $('[data-mobile-menu]');
  
  if($mobileMenu.length) {
    $mobileMenu.addClass('mobile-menu');
    $mobileMenu.find('li').addClass('mobile-menu__item');
    $mobileMenu.find('a').addClass('mobile-menu__link');
    
    var $mobileMenuButton =  $('<button />', {
      'class': 'mobile-menu__btn',
      'data-mobile-menu-toggle': ''
    }).insertAfter($mobileMenu);
    var $mobileMenuButtonLine = $('<span />', {
      'class': 'mobile-menu__line'
    }).appendTo($mobileMenuButton);
    
    $mobileMenuButton.on('click', function() {
      $mobileMenu.toggleClass('is-visible');
      $(this).toggleClass('is-active');
      $overlay.toggleClass('is-active');
    });
  }

  // Modal
  var $modalToggle = $('[data-modal-toggle]');
  
  if($modalToggle.length) {
    $modalToggle.each(function() {
      var $this = $(this);

      $this.on('click', function() {
        $($this.attr('href')).toggleClass('is-visible');
        $overlay.toggleClass('is-active');
      });
    });
  }

  // Overlay
  var $overlay = $('<div />', {
    'class': 'overlay',
    'data-overlay': ''
  }).appendTo($('body'));
  
  $overlay.on('click', function() {
    $overlay.toggleClass('is-active');

    if($mobileMenu.length && $mobileMenu.hasClass('is-visible')) {
      $mobileMenu.toggleClass('is-visible');
    }

    if($mobileMenuButton !== undefined && $mobileMenuButton.hasClass('is-active')) {
      $mobileMenuButton.toggleClass('is-active');
    }

    if($('[data-modal]').length) {
      $('[data-modal]').each(function() {
        var $modal = $(this);

        if($modal.hasClass('is-visible')) {
          $modal.toggleClass('is-visible');
        }
      });
    }
  });
});