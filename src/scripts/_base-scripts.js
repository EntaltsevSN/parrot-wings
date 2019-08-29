$(function() {
  var cssClass = {
    isActive: 'is-active'
  }

  // Update select styles
  function updateSelectStyles(selectItem) {
    $(selectItem).each(function() {
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
          $newOptions.removeClass(cssClass.isActive);
        });
      });
  
      $select.hide();
  
      $newValue.on('click', function() {
        $newOptions.toggleClass(cssClass.isActive);
      });
  
      $(document).mouseup(function (e) {
        if (!$newOptions.is(e.target)) {
          $newOptions.removeClass(cssClass.isActive);
        }
      });
    });
  };

  //Update checkbox styles
  function updateCheckboxStyles(checkboxItem) {
    $(checkboxItem).each(function() {
      var $checkbox = $(this);
      var $newCheckbox = $('<label />', {
        'class': 'checkbox',
        'for': $checkbox.attr('id')
      }).insertAfter($checkbox);
      var $newCheckboxIcon = $('<i />', { 'class': 'fas fa-check' }).appendTo($newCheckbox);
  
      $checkbox.hide();
    });
  };

  //Update radio styles
  function updateRadioStyles (radioItem) {
    $(radioItem).each(function() {
      var $radio = $(this);
      var $newRadio = $('<label />', {
        'class': 'radio',
        'for': $radio.attr('id')
      }).insertAfter($radio);
      var $newRadioIcon = $('<i />', { 'class': 'radio__icon' }).appendTo($newRadio);
  
      $radio.hide();
    });
  };

  // Overlay
  var $overlay = $('<div />', {
    'class': 'overlay',
    'data-overlay': ''
  }).appendTo($('body'));
  
  function runOverlayClick(toggleElement) {
    $overlay.on('click', function() {
      $(this).removeClass(cssClass.isActive);

      toggleElement.each(function() {
        var $this = $(this);

        if($this !== undefined || $this.length) {
          if($this.hasClass(cssClass.isActive)) {
            $this.toggleClass(cssClass.isActive);
          }
        }
      })
    });
  }

  // Mobile menu
  function runMobileMenu(mobileMenuItem) {
    var $mobileMenuItem = $(mobileMenuItem);
  
    if($mobileMenuItem.length) {
      $mobileMenuItem.each(function() {
        var $mobileMenu = $(this);

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
          $mobileMenu.toggleClass(cssClass.isActive);
          $(this).toggleClass(cssClass.isActive);
          $overlay.addClass(cssClass.isActive);
        });

        runOverlayClick($mobileMenu);
        runOverlayClick($mobileMenuButton);
      });
    }
  }

  // Modal
  function runModal(modalItem) {
    var $modalItem = $(modalItem);
  
    if($modalItem.length) {
      $modalItem.each(function() {
        var $modal = $(this);
        var $modalLink = $('a[href="#' + $modal.attr('id') + '"]');

        $modalLink.on('click', function() {
          $modal.toggleClass(cssClass.isActive);
          $overlay.addClass(cssClass.isActive);
        });
      });
    }

    runOverlayClick($modalItem);
  }

  // Run base scripts
  updateSelectStyles('select');
  updateCheckboxStyles('input[type="checkbox"]');
  updateRadioStyles('input[type="radio"]');
  runMobileMenu('[data-mobile-menu]');
  runModal('[data-modal]');
});