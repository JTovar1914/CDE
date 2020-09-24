jQuery(function ($) {
    $(document).ready(function () {
        var lat
        var lng
        var within

        function initialize() {
            var input = document.getElementById("headermapsearch")
            var searchBox = new google.maps.places.Autocomplete(input)
            // console.log('done');

            google.maps.event.addListener(searchBox, "places_changed", function () {
                var place = searchBox.getPlaces()[0]
                lat = place.geometry.location.lat()
                lng = place.geometry.location.lng()

                // console.log(place);
                // console.log(lng);

                // if((typeof lat !== 'undefined') && (typeof lng !== 'undefined')) {
                // 	console.log(lat);
                // 	console.log(lng);

                // 	// if($('#within').val().length) {

                // 	// 	within = $('#within').val();
                // 	// 	window.location.href = '/where-to-shoot?lat=' + lat + '&lng=' + lng + '&within=' + within;
                // 	// } else {
                // 	// 	window.location.href = '/where-to-shoot?lat=' + lat + '&lng=' + lng;
                // 	// }
                // } else {
                // 	console.log('no lat or lng');
                // }
            })
        }

        google.maps.event.addDomListener(window, "load", initialize)

        $('#header-search input[type="submit"]').on("click touchstart", function (e) {
            e.preventDefault()
            e.stopPropagation()
            var within = $("#within").val()

            // if((typeof lat !== 'undefined') && (typeof lng !== 'undefined')) {
            // 	console.log(lat);
            // 	console.log(lng);

            // 	if($('#within').val().length) {

            // 		window.location.href = '/where-to-shoot?lat=' + lat + '&lng=' + lng + '&miles=' + within;

            // 	} else {
            // 		window.location.href = '/where-to-shoot?lat=' + lat + '&lng=' + lng;
            // 	}
            // } else {
            var val = $('#header-search input[type="text"]').val()

            if (typeof val !== "undefined" && val !== "") {
                window.location.href = "/where-to-shoot?search=" + val + "&miles=" + within
            }

            // }
        })

        $("[data-fancybox]").fancybox({
            // Options will go here
        })

        FastClick.attach(document.body)

        $(".flickity-mobile").flickity({
            percentPosition: false,
            watchCSS: true,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true,
            resize: true,
        })

        $(".flickity-mobile-single").flickity({
            percentPosition: false,
            watchCSS: true,
            pageDots: false,
            wrapAround: true,
            resize: true,
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 65,
                y2: 45,
                x3: 20,
            },
        })

        // $.fn.innerstaticHeight = function() {
        // 	var heightOfOuterfixed = $(window).height(),
        // 	offset = $('.header-dropdowns').offset(),
        // 	topOfInnerstatic2 = offset.top,
        // 	potentialHeight = heightOfOuterfixed - topOfInnerstatic2;
        // 	console.log(potentialHeight);

        // 	$('.header-dropdowns').css('height',potentialHeight);
        // }

        // $('.header-dropdowns').innerstaticHeight();

        $("a.dropdown-toggle").on("click touchstart", function (e) {
            e.preventDefault()
            e.stopPropagation()
            console.log("clicked")
            var target = $(this).data("dropdown")
            var windowWidth = $(window).width()

            // For non-persona Menus
            if (target !== "persona-menus") {
                // Set Toggle state for clicked button
                if ($(this).hasClass("toggled")) {
                    $(this).removeClass("toggled")
                    $("body").removeClass("menu-active")
                    $("html").css("overflow", "visible")
                } else {
                    $("a.dropdown-toggle").removeClass("toggled")
                    $(this).addClass("toggled")
                    $("body").addClass("menu-active")

                    if (windowWidth < 1024) {
                        $("html").css("overflow", "hidden")
                    }

                    if ("body.logged-in") {
                        var bodyHeight = $(window).height() - 90
                    } else {
                        var bodyHeight = $(window).height()
                    }
                    // $('body').css('height', bodyHeight);
                }

                // For Non-Persona Menus
                if ($("." + target).hasClass("active")) {
                    $("." + target).removeClass("active")
                    $(".header-dropdowns").removeClass("active")
                    $("." + target)
                        .find("li.active")
                        .removeClass("active")
                    $("." + target + " input").blur()
                } else {
                    // Remove other active dropdowns if any
                    $(".dropdown-single").removeClass("active")

                    // Set dropdown to active
                    $("." + target).addClass("active")
                    $(".header-dropdowns").addClass("active")

                    var input = $("." + target + ' input[type="text"]')
                    if (input.length == 0) {
                        input = $("." + target + ' input[type="search"]')
                    }

                    $("." + target)
                        .find("li.active")
                        .removeClass("active")

                    // Move cursor to form
                    $(input).focus().select()
                }

                // Remove any active persona menus if any
                if ($(".persona-menu-single").hasClass("active")) {
                    $(".persona-menu-single").removeClass("active")
                }

                // For Persona Menu
            } else {
                // We're dealing with a persona navigation
                var persona = $(this).data("persona")

                // Toggle for the toggle button
                if ($(this).hasClass("toggled")) {
                    $(this).removeClass("toggled")
                    $("body").removeClass("menu-active")
                } else {
                    $("a.dropdown-toggle").removeClass("toggled")
                    $(this).addClass("toggled")
                    $("body").addClass("menu-active")
                }

                // Set wrapper to active
                if ($("." + target).hasClass("active")) {
                    // If the wrapper already is active
                    // Only hide wrapper if the same toggle is selected twice
                    if ($(".persona-menu-single." + persona).hasClass("active")) {
                        // console.log('true');
                        $(".dropdown-single").removeClass("active")
                    } else {
                        // console.log('false');
                    }
                } else {
                    // If the wrapper isn't active
                    // Make wrapper visible
                    $(".dropdown-single").removeClass("active")
                    $("." + target).addClass("active")
                }

                // Toggle for single menus
                if ($("." + persona).hasClass("active")) {
                    $("." + persona).removeClass("active")
                } else {
                    $(".persona-menu-single").removeClass("active")
                    $("." + persona).addClass("active")
                }
            }
        })

        $(".dropdown-single .close").on("click touchstart", function (e) {
            e.stopPropagation()
            $(this).closest(".dropdown-single").removeClass("active")
            $(".dropdown-single input").blur()
            $("a.dropdown-toggle").removeClass("toggled")
            $("body").removeClass("menu-active")
            $("html").css("overflow", "visible")
        })

        $(".h-menu > li.menu-item-has-children:not(.block) > a").on("click touchend", function (e) {
            var windowWidth = $(window).width()
            if (windowWidth < 1024) {
                e.preventDefault()
                e.stopPropagation()
                if ($(this).parent("li").hasClass("active")) {
                    $(this).parent("li").removeClass("active")
                } else {
                    $(".h-menu > li.menu-item-has-children").removeClass("active")
                    $(this).parent("li").addClass("active")
                }
            }
        })

        var specifiedElement = ".header-dropdowns"

        $(window).on("click touchstart", function (e) {
            //Hide the menus if visible

            if (".dropdown-single.active".length) {
                if ($(event.target).is("#content *")) {
                    // console.log('click outside dropdown');

                    if ($("body.menu-active").length) {
                        if (!$(event.target).is(".header-dropdowns *, .header-dropdowns, .pac-container")) {
                            $("a.dropdown-toggle").removeClass("toggled")
                            $(".dropdown-single").removeClass("active")
                            $(".dropdown-single input").blur()
                        }

                        $("body").removeClass("menu-active")
                        $("html").css("overflow", "visible")
                        $("#site-navigation li").removeClass("active")
                    }

                    //the click was outside the specifiedElement, do something
                }
            }
        })

        function parseMonthCust(month) {
            var newMonth

            if (month == "Jan") {
                newMonth = "01"
            } else if (month == "Feb") {
                newMonth = "02"
            } else if (month == "Mar") {
                newMonth = "03"
            } else if (month == "Apr") {
                newMonth = "04"
            } else if (month == "May") {
                newMonth = "05"
            } else if (month == "Jun") {
                newMonth = "06"
            } else if (month == "Jul") {
                newMonth = "07"
            } else if (month == "Aug") {
                newMonth = "08"
            } else if (month == "Sep") {
                newMonth = "09"
            } else if (month == "Oct") {
                newMonth = "10"
            } else if (month == "Nov") {
                newMonth = "11"
            } else if (month == "Dec") {
                newMonth = "12"
            }

            return newMonth
        }

        // function parseTwitterDate(text) {
        // 	return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
        // }

        function calculateSince(datetime) {
            /**
             * Calculates the Twitter time since the tweet was created
             * @param datetime returned by Twitter API in created_at
             * @return time since in html
             */
            var tTime = new Date(datetime)

            if (isNaN(tTime.getTime())) {
                var split = datetime.split(" ")
                var timeSplit = split[3].split(":")
                var month = parseMonthCust(split[1])
                var hours = timeSplit[0]
                var minutes = timeSplit[1]
                var newTime =
                    split[5] + "-" + month + "-" + split[2] + "T" + split[3] + "." + split[4].replace("+", "") + "Z"
                // var newTime = '2012-11-02T19:30:00.000Z';

                console.log(newTime)
                var tTime = new Date(newTime)
                console.log(tTime)
            }
            var cTime = new Date()
            var sinceMin = Math.round((cTime - tTime) / 60000)
            if (sinceMin == 0) {
                var sinceSec = Math.round((cTime - tTime) / 1000)
                if (sinceSec < 10) var since = "less than 10 seconds ago"
                else if (sinceSec < 20) var since = "less than 20 seconds ago"
                else var since = "half a minute ago"
            } else if (sinceMin == 1) {
                var sinceSec = Math.round((cTime - tTime) / 1000)
                if (sinceSec == 30) var since = "half a minute ago"
                else if (sinceSec < 60) var since = "less than a minute ago"
                else var since = "1 minute ago"
            } else if (sinceMin < 45) var since = sinceMin + " minutes ago"
            else if (sinceMin > 44 && sinceMin < 60) var since = "about 1 hour ago"
            else if (sinceMin < 1440) {
                var sinceHr = Math.round(sinceMin / 60)
                if (sinceHr == 1) var since = "about 1 hour ago"
                else var since = "about " + sinceHr + " hours ago"
            } else if (sinceMin > 1439 && sinceMin < 2880) var since = "1 day ago"
            else {
                var sinceDay = Math.round(sinceMin / 1440)
                var since = sinceDay + " days ago"
            }
            return since
        }

        // function calculateSince(datetime) {
        // 	/**
        // 	* Calculates the Twitter time since the tweet was created
        // 	* @param datetime returned by Twitter API in created_at
        // 	* @return time since in html
        // 	*/
        // 	var split = datetime.split(' ');
        // 	var year = split[5];
        // 	var month = split[1];
        // 	month = parseMonthCust(month);
        // 	var day = split[2];
        // 	var minutes = split[3];
        // 	var timezone = split[4].replace(/( +)/, ' UTC$1');
        // 	var mystring = year + '-' + month + '-' + day + 'T' + minutes + ' ' + split[4];
        // 	var test = new Date('2017-07-01T01:01:01');
        // 	var test2 = new Date(parseTwitterDateyear + '-' + month + '-' + day + 'T' + minutes);
        // 	var tTime = new Date(mystring);
        // 	console.log(mystring);
        // 	console.log(tTime);
        // 	console.log(test2);
        // 	var cTime = new Date();

        // 	var sinceMin=Math.round((cTime-tTime)/60000);
        // 	if(sinceMin == 0) {
        // 		var sinceSec=Math.round((cTime-tTime)/1000);
        // 		if(sinceSec < 10) {
        // 			var since = 'less than 10 seconds ago';
        // 		} else if(sinceSec < 20) {
        // 			var since = 'less than 20 seconds ago';
        // 		} else {
        // 			var since = 'half a minute ago';
        // 		}
        // 	}
        // 	else if(sinceMin == 1) {
        // 		var sinceSec=Math.round((cTime-tTime)/1000);
        // 		if(sinceSec == 30) {
        // 			var since = 'half a minute ago';

        // 		} else if(sinceSec < 60) {
        // 			var since = 'less than a minute ago';

        // 		} else {
        // 			var since = '1 minute ago';

        // 		}
        // 	}
        // 	else if(sinceMin < 45) {
        // 		var since = sinceMin + ' minutes ago';

        // 	}
        // 	else if((sinceMin > 44) && (sinceMin < 60)) {
        // 		var since='about 1 hour ago';
        // 	} else if(sinceMin < 1440) {
        // 		var sinceHr=Math.round(sinceMin/60);
        // 		if(sinceHr == 1) {
        // 			var since = 'about 1 hour ago';
        // 		} else {
        // 			var since = 'about ' + sinceHr + ' hours ago';
        // 		}
        // 	} else if((sinceMin > 1439) && (sinceMin < 2880)) {
        // 		var since = '1 day ago';
        // 	} else {
        // 		var sinceDay = Math.round(sinceMin/1440);
        // 		var since = sinceDay + ' Days Ago';

        // 	}

        // 	return since;
        // }

        $(".twitter-widget .since").each(function () {
            var date = $(this).data("time")
            // console.log(date);
            var since = calculateSince(date)
            $(this).empty()
            $(this).html(since)
        })

        $(".noclick").on("click touchstart", function (e) {
            e.preventDefault()
            console.log("click")
        })

        $("select").niceSelect()

        if ($(".where-to-buy #results").length) {
            var newData = {
                action: "get_retailers",
                internet_only: true,
            }
            // We can also pass the url value separately from ajaxurl for front end AJAX implementations
            $.post(ajax_object.ajax_url, newData, function (response) {
                $("#results").empty()
                $("#results").html(response)
                var numberOfItems = $(".single-retailer-block").length
                console.log(numberOfItems)

                if (numberOfItems > per_page) {
                    $("#wth-navigation").pagination({
                        items: numberOfItems,
                        itemsOnPage: per_page,
                        prevText: ">",
                        nextText: "<",
                        onPageClick: function (pageNumber, event) {
                            $(".page").each(function () {
                                if ($(this).data("page") == pageNumber) {
                                    $(".page").removeClass("active")
                                    $(this).addClass("active")
                                }
                            })
                        },
                    })
                }
            })
        }

        $("input[type=radio][name=searchby]").change(function () {
            console.log("change")
            if (this.value == "online") {
                // $("#where-to-buy-form .nice-select").hide()
                $("#where-to-buy-form .nice-select").addClass("disabled")
                $("#where-to-buy-form .nice-select").prop("disabled", true).niceSelect("update")
            } else {
                // $("#where-to-buy-form .nice-select").show()
                $("#where-to-buy-form .nice-select").removeClass("disabled")
                $("#where-to-buy-form .nice-select").prop("disabled", false).niceSelect("update")
            }
        })

        $("#where-to-buy-form").submit(function (e) {
            e.preventDefault()
            const formData = $("#where-to-buy-form").serializeArray()
            let internetOnly = ""
            formData.map(single => {
                if (single.name === "searchby") {
                    if (single.value === "online") {
                        internetOnly = true
                    } else {
                        internetOnly = false
                    }
                }
            })

            // console.log("searchby", internetOnly)
            $("#results").empty()
            $("#results").html('<div class="fancybox-loading-wrapper"><div class="fancybox-loading"></div></div>')
            var stateInput = $("#state").val()

            var newData = {
                action: "get_retailers",
                state: stateInput,
                internet_only: internetOnly,
            }
            // We can also pass the url value separately from ajaxurl for front end AJAX implementations
            $.post(ajax_object.ajax_url, newData, function (response) {
                $("#results").html(response)
                var numberOfItems = $(".single-retailer-block").length
                // console.log(numberOfItems)

                if (numberOfItems > per_page) {
                    $("#wth-navigation").pagination({
                        items: numberOfItems,
                        itemsOnPage: per_page,
                        prevText: ">",
                        nextText: "<",
                        onPageClick: function (pageNumber, event) {
                            $(".page").each(function () {
                                if ($(this).data("page") == pageNumber) {
                                    $(".page").removeClass("active")
                                    $(this).addClass("active")
                                }
                            })
                        },
                    })
                }
            })
        })

        $("#nssf-map").css("visibility", "visible")

        $("#chat-button-close").on("click touchstart", function () {
            $("#chat-notification").hide()
        })

        $(".half-slider").flickity({
            freeScroll: false,
            pageDots: false,
            wrapAround: true,
            autoPlay: false,
            fullscreen: false,
            fade: true,
            draggable: false,
        })

        $(".copy").on("click touchstart", function (e) {
            e.preventDefault()
            var input = $(this).next(".url-input")

            input.select()
            document.execCommand("copy")
            alert("copied link to clipboard")
        })

        if ($(".custom-modal-shortcode").length) {
            const existingModals = JSON.parse(localStorage.getItem("custom_modal"))
            console.log("existingmodals", existingModals)
            const modalId = $(".custom-modal-shortcode").attr("id")

            if (!existingModals || !existingModals.includes(modalId)) {
                setTimeout(function () {
                    $.fancybox.open({
                        src: ".custom-modal-shortcode",
                        type: "inline",
                    })
                }, 3000)
                let newModals
                if (existingModals) {
                    const existingModalArray = existingModals.slice(0)
                    newModals = existingModalArray.length > 0 ? [...existingModalArray, modalId] : [modalId]
                } else {
                    newModals = [modalId]
                }

                localStorage.setItem("custom_modal", JSON.stringify(newModals))
            } else {
                console.log("you have already been shown modal id = " + modalId)
            }
        }
    })
    $(window).load(function () {
        $("input[type=radio][value=online]").click()
        $("#where-to-buy-form .nice-select").addClass("disabled")
    })
})
