jQuery(document).ready(function() {
    jQuery(".sst-table > table").addClass('responsive');
  var switched = false;
 function updateTables() {
    if ((jQuery(window).width() < 767) && !switched ){
      switched = true;
        jQuery("table.responsive").each(function(i, element) {
      //jQuery("div.sst-table.responsive table").each(function(i, element) {
        splitTable(jQuery(element));
      });
      return true;
    }
    else if (switched && (jQuery(window).width() > 767)) {
      switched = false;
      jQuery("table.responsive").each(function(i, element) {
        unsplitTable(jQuery(element));
      });
    }
  };
   
  jQuery(window).load(updateTables);
  jQuery(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  jQuery(window).on("resize", updateTables);

	
	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        height,
        heights = [],
        child_height = [];


      tr_copy.each(function (index) {
          height = jQuery(this).outerHeight(true);
          child_height[index] = child_height[index] || 0;
          if (height > child_height[index]) child_height[index] = height;
      });

    tr.each(function (index) {
      var self = jQuery(this),
          tx = self.find('th, td');
        jQuery(this).height(child_height[index]);
      tx.each(function () {
        height = jQuery(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      jQuery(this).height(heights[index]);
    });
  }

  /* Search */
    jQuery('.sst-table-search input').keyup(function(){
        _this = this;

        jQuery.each(jQuery(this).parents('.sst-table').find('table tbody tr'), function() {
            if(jQuery(this).text().toLowerCase().indexOf(jQuery(_this).val().toLowerCase()) === -1) {
                jQuery(this).hide();
            } else {
                jQuery(this).show();
            }
        });
    });

});