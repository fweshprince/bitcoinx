;(function($) {
    "use strict";
 
    /*----------------------------------------------------*/
    /*  Main slider js
    /*----------------------------------------------------*/
    function home_main_slider(){
        if ( $('.slider_inner').length ){
            $('.slider_inner').camera({
                height: '707px',
                loader: true,
                navigation: true,
                autoPlay:false,
                time: 4000,
                playPause: false,
                pagination: false,
                thumbnails: false,
                overlayer: true,
                hover: false,
                loader: 'bar',
                barPosition: 'top'
            });
        }
    }
 
    /*----------------------------------------------------*/
    /*  Testimonial slider js
    /*----------------------------------------------------*/
    function testimonial_slider(){
        if ( $('.testimonials_slider').length ){
            $('.testimonials_slider').owlCarousel({
//                loop:true,
                margin: 0,
                nav:true,
                items:1,
                smartSpeed: 2000,
                navContainer: ".testimonials_slider",
                navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            });
        }
    }
 
    /*----------------------------------------------------*/
    /*  Testimonial slider js
    /*----------------------------------------------------*/
    function blog_slider(){
        if ( $('.blog_slider_img').length ){
            $('.blog_slider_img').owlCarousel({
                loop:true,
                margin: 0,
                nav:true,
                items:1,
                smartSpeed: 2000,
                autoplay: true,
                navContainer: ".blog_slider_img",
                navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            });
        }
    }
 
    /*----------------------------------------------------*/
    /*  Testimonial slider js
    /*----------------------------------------------------*/
    function company_about(){
        if ( $('.company_about_slider').length ){
            $('.company_about_slider').owlCarousel({
                loop:true,
                margin: 0,
                nav:false,
                items:1,
                smartSpeed: 3000,
                navContainer: ".company_about_slider",
            });
        }
    }
    
    /*----------------------------------------------------*/
    /*  Portfolio Isotope js
    /*----------------------------------------------------*/
    function portfolio_isotope(){
        if ( $('.portfolio_inner').length ){
            
            // Activate isotope in container
            $(".portfolio_inner").imagesLoaded( function() {
                $(".portfolio_inner").isotope({
                    itemSelector: ".portfolio_single",
                    layoutMode: "fitRows",       
                }); 
            });
            
            // Add isotope click function
            $(".portfolio_menu li").on('click',function(){
                $(".portfolio_menu li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".portfolio_inner").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });
        }
    }
    
    /*----------------------------------------------------*/
    /*  Portfolio Isotope js
    /*----------------------------------------------------*/
    function project_info_slider(){
        if ( $('.project_info_slider').length ){
            $('#project_info_carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 169,
                itemMargin: 31,
                asNavFor: '#project_info_slider',
                controlsContainer: $(".project_carousel_inner"),
                customDirectionNav: $(".custom-navigation-carousel a")
            });

            $('#project_info_slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#project_info_carousel",
                controlsContainer: $(".project_info_inner"),
                customDirectionNav: $(".custom-navigation a")
            });
        }
    }
    
    
    
    
    
    /*----------------------------------------------------*/
    /*Function Calling*/
    /*----------------------------------------------------*/
    home_main_slider();
    portfolio_isotope();
    testimonial_slider();
    company_about();
    project_info_slider();
    blog_slider()
    
    
    function createByJson() {
        var jsonData = [					
            {description:'Choos your payment gateway', value:'', text:'Payment Gateway'},					
            {image:'../img/aus-flag.jpg', description:'My life. My card...', value:'amex', text:'Amex'},
            {image:'../img/aus-flag.jpg', description:'It pays to Discover...', value:'Discover', text:'Discover'},
            {image:'../img/aus-flag.jpg', title:'For everything else...', description:'For everything else...', value:'Mastercard', text:'Mastercard'},
            {image:'../img/aus-flag.jpg', description:'Sorry not available...', value:'cash', text:'Cash on devlivery', disabled:true},
            {image:'../img/aus-flag.jpg', description:'All you need...', value:'Visa', text:'Visa'},
            {image:'../img/aus-flag.jpg', description:'Pay and get paid...', value:'Paypal', text:'Paypal'}
        ];
        $("#byjson").msDropDown({byJson:{data:jsonData, name:'payments2'}}).data("dd");
    }
    $(document).ready(function(e) {		
    //no use
    try {
        var pages = $("#pages").msDropdown({on:{change:function(data, ui) {
            var val = data.value;
            if(val!="")
                window.location = val;
        }}}).data("dd");

        var pagename = document.location.pathname.toString();
        pagename = pagename.split("/");
        pages.setIndexByValue(pagename[pagename.length-1]);
        $("#ver").html(msBeautify.version.msDropdown);
    } catch(e) {
    //console.log(e);	
    }

    $("#ver").html(msBeautify.version.msDropdown);

    //convert
    $("select").msDropdown({roundedBorder:false});
        createByJson();
        $("#tech").data("dd");
    });
    function showValue(h) {
        console.log(h.name, h.value);
    }
    $("#tech").change(function() {
        console.log("by jquery: ", this.value);
    })
    
    /*----------------------------------------------------*/
    /*stick menu function*/
    /*----------------------------------------------------*/
    
    var nav_offset_top = $('.main_menu_area').offset().top;
    
    if ( nav_offset_top == 0 ){
        nav_offset_top = 1
    }
    
    $('.main_menu_area').affix({
        offset: {
            top: nav_offset_top,
        }
    });
    
    
    
    /*----------------------------------------------------*/
    /*Loading function*/
    /*----------------------------------------------------*/
    
    $(window).load(function() { // makes sure the whole site is loaded
		 $('#preloader_1').fadeOut(); // will first fade out the loading animation
		 $('#preloader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
		 $('body').delay(150).css({'overflow':'visible'})
     })
    
    
})(jQuery)

