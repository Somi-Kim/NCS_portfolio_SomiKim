$(document).ready(function() {
    // 스크롤 버벅거림 방지용 로딩
    is_loading = true;
    $("html, body").stop(true, true).animate({scrollTop: document.body.scrollHeight, scrollLeft: 0}, 1400);
    setTimeout(function() {
        $("html, body").stop(true, true).animate({scrollTop: 0, scrollLeft: 0}, 1500);
    }, 1500);

    // _______________________________________________header
    // gnb 메뉴 보이기/숨기기
    let gnb_open = true;
    $(".menu_pop").click(function() {
        $(".gnb").stop(true, true).slideToggle();

        if(gnb_open) {
            $(".menu_pop").stop(true, true).animate({"top":"0px"});
            $(".menu_pop>span").text("arrow_drop_down");
            gnb_open = false;
        } else {
            $(".menu_pop").stop(true, true).animate({"top":"50px"});
            $(".menu_pop>span").text("arrow_drop_up");
            gnb_open = true;
        }
    });

    // 스크롤이 내려가면 gnb 숨기기
    $(window).scroll(function() {
        if($(this).scrollTop() > 0 && gnb_open) {
            $(".gnb").stop(true, true).slideUp();
            $(".menu_pop").stop(true, true).animate({"top":"0px"});
            $(".menu_pop>span").text("arrow_drop_down");
            gnb_open = false;
        } else if ($(this).scrollTop() <= 0 && !gnb_open) {
            $(".gnb").stop(true, true).slideDown();
            $(".menu_pop").stop(true, true).animate({"top":"50px"});
            $(".menu_pop>span").text("arrow_drop_up");
            gnb_open = true;
        }
    });

    // gnb click시 scroll animation
    let sec_count = 0;
    $(".gnb>ul>li>a").click(function(event) {
        event.preventDefault(); // prevent a tag move for scroll animation
        
        sec_count = $(this).parent().index() + 1;
        $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top});
    });

    // up/down button 클릭 시 세션 이동 
    // (visual에서 버튼을 눌러 이동하라 알려주기)
    $(".go_up").click(function() {
        if(sec_count > 0) {
            sec_count -= 1;
        }
        $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top});
    });
    $(".go_down").click(function() {
        if(sec_count < 5) {
            sec_count += 1;
        }
        $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top});
    });

    // 로고 클릭 시 페이지 가장 위로 움직임
    $(".logo").click(function() {
        sec_count = 0;
        if($(window).scrollTop() > 100) {
            $("html, body").stop(true, true).animate({scrollTop: 0}, 500, "easeInOutCirc");
        }
    });

    // window size resize : fit section top
    $(window).resize(function() {
        $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top});
    });


    // _______________________________________________section

        // visual
        // loading 페이지가 사라질 때 visual text의 애니메이션 시작
    setTimeout(function() {
        $('.visual_text').delayText({
            time: 2500
        });
        $(".visual_godown").animate({"opacity": "1"}, 3000);
        $("#loading").children().animate({"opacity": "0"}, 300, function() {
            $("#loading").children().css({"display": "none"});
            $("#loading").animate({"opacity": "0"}, 500, function() {
                $("#loading").css({"display": "none"});
                is_loading = false;
            });
        });
    }, 3000);


        // scroll = 1 section move
    let is_scrolled = true; // 한 스크롤 애니메이션이 진행 중일 경우 중첩 애니메이션 방지
    let is_modal = false; // 모달/팝업 등이 표시되어있는 경우 세션 스크롤 방지
    $("html, body").on('mousewheel DOMMouseScroll', function(e) {
        let E = e.originalEvent;
        // console.log(E);
        delta = 0;
        if (E.detail) {
            // firefox의 detail 값은 휠을 내릴 경우 양수/올릴 경우 음수
            // = 타 브라우저와 반대 부호
            delta = E.detail * -40;
        } else {
            delta = E.wheelDelta;
        };

        if(delta < 0 && is_scrolled && !is_modal && !is_loading){ // 마우스 휠을 아래로 내렸을 경우
            if(sec_count < 5) {
                is_scrolled = false;
                sec_count += 1;
                $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top}, function() {
                    is_scrolled = true;
                });
            }
        } else if(delta > 0 && is_scrolled && !is_modal && !is_loading){ // 마우스 휠을 위로 올렸을 경우
            if(sec_count > 0) {
                is_scrolled = false;
                sec_count -= 1;
                $("html, body").stop(true, true).animate({scrollTop: $("section>div").eq(sec_count).offset().top}, function() {
                    is_scrolled = true;
                });
            }
        };
    });
    // 출처: https://recoveryman.tistory.com/121 [회복맨 블로그]



        // ___________________________________________responsive
    $(".res_clicked1").css({"display": "none", "opacity": "0"});
    $(".res_clicked2").css({"display": "none", "opacity": "0"});

    let respons_on = false;
    let r1_on = false;
    let r2_on = false;
    let is_rbtn = false;
    $(".respons1_hover").click(function() {
        if(!respons_on && !r1_on && !r2_on) {
            respons_on = true;
            r1_on = true;

            $(".res_default").stop(true, true).animate({"opacity": "0"}, 300, function() {
                $(this).css({"display": "none"});

                $(".res_clicked1").css({"display": "block"});
                $(".res_clicked1").stop(true, true).animate({"opacity": "1"}, 1000);
            });

            $(".respons1").stop(true, true).animate({"width": "85%", "height": "55%", "padding": "5%"}, 100, "easeOutCirc");
            $(".respons1").find("h3").stop(true, true).animate({"font-size": "1.5vw"}, 100, "easeOutCirc");
            $(".respons1").find("h2").stop(true, true).animate({"font-size": "3vw"}, 100, "easeOutCirc");
            $(".respons1").find(".rdesc").stop(true, true).animate({"bottom": "-20px", "width": "20%", "height": "60%", "opacity": "1"}, 100, "easeOutCirc");

            $(".respons1").find(".mobile").animate({"left": "5%", "bottom": "30%"});
            $(".respons1").find(".pc").animate({"left": "18%", "bottom": "30%"});
            $(".respons1").find(".tablet").animate({"left": "65%", "bottom": "30%"});

            $(".respons2").stop(true, true).animate({"width": "7%", "height": "4%"}, 100, "easeOutCirc", function() {
                $(".respons2").find("div").not(".rshowcase").stop(true, true).animate({"opacity": "0"}, 200, "easeOutCirc");

                $(".respons1").find(".mobile_btn").css({"display": "block"});
                $(".respons1").find(".pc_btn").css({"display": "block"});
                $(".respons1").find(".tablet_btn").css({"display": "block"});
            });
            
            $(".respons1_hover").css({"display": "none"});
            $(".respons2_hover").css({"display": "none"});

            respons_on = false;
        };
    });

    $(".respons1").click(function() {
        if(!respons_on && r1_on && !r2_on && !is_rbtn) {
            respons_on = true;

            $(".res_clicked1").stop(true, true).animate({"opacity": "0"}, 300, function() {
                $(this).css({"display": "none"});

                $(".res_default").css({"display": "block"});
                $(".res_default").stop(true, true).animate({"opacity": "1"}, 500);
            });

            $(this).find(".mobile_btn").css({"display": "none"});
            $(this).find(".pc_btn").css({"display": "none"});
            $(this).find(".tablet_btn").css({"display": "none"});

            $(this).stop(true, true).animate({"width": "60%", "height": "45%", "padding": "2%"}, 100, "easeOutCirc");
            $(this).find("h3").stop(true, true).animate({"font-size": "1.5vw"}, 100, "easeOutCirc");
            $(this).find("h2").stop(true, true).animate({"font-size": "2.5vw"}, 100, "easeOutCirc");
            $(this).find(".rdesc").stop(true, true).animate({"bottom": "20px", "width": "20%", "height": "40%", "opacity": "0"}, 100, "easeOutCirc");
        
            $(this).find(".mobile").animate({"left": "7%", "bottom": "5%"});
            $(this).find(".pc").animate({"left": "17%", "bottom": "10%"});
            $(this).find(".tablet").animate({"left": "50%", "bottom": "5%"});

            $(".respons2").stop(true, true).animate({"width": "60%", "height": "45%"}, 100, "easeOutCirc", function() {
                $(".respons2").find("div").not(".rshowcase").stop(true, true).animate({"opacity": "1"}, 200, "easeOutCirc", function() {
                    $(".respons2>.rdesc").css({"opacity": "0"});
                });

                $(".respons1_hover").css({"display": "block"});
                $(".respons2_hover").css({"display": "block"});
            });
        
            respons_on = false;
            r1_on = false;
        }
        is_rbtn = false;
    });

    $(".respons2_hover").click(function() {
        if(!respons_on && !r1_on && !r2_on) {
            respons_on = true;
            r2_on = true;

            $(".res_default").stop(true, true).animate({"opacity": "0"}, 300, function() {
                $(this).css({"display": "none"});

                $(".res_clicked2").css({"display": "block"});
                $(".res_clicked2").stop(true, true).animate({"opacity": "1"}, 1000);
            });

            $(".respons2").stop(true, true).animate({"width": "85%", "height": "55%", "padding": "5%"}, 100, "easeOutCirc");
            $(".respons2").find("h3").stop(true, true).animate({"font-size": "1.5vw"}, 100, "easeOutCirc");
            $(".respons2").find("h2").stop(true, true).animate({"font-size": "3vw"}, 100, "easeOutCirc");
            $(".respons2").find(".rdesc").stop(true, true).animate({"bottom": "20px", "width": "20%", "height": "60%", "opacity": "1"}, 100, "easeOutCirc");

            $(".respons2").find(".mobile").animate({"left": "5%", "bottom": "30%"});
            $(".respons2").find(".pc").animate({"left": "18%", "bottom": "30%"});
            $(".respons2").find(".tablet").animate({"left": "65%", "bottom": "30%"});

            $(".respons1").stop(true, true).animate({"width": "7%", "height": "4%"}, 100, "easeOutCirc", function() {
                $(".respons1").find("div").not(".rshowcase").stop(true, true).animate({"opacity": "0"}, 200, "easeOutCirc");

                $(".respons2").find(".mobile_btn").css({"display": "block"});
                $(".respons2").find(".pc_btn").css({"display": "block"});
                $(".respons2").find(".tablet_btn").css({"display": "block"});
            });
            
            $(".respons1_hover").css({"display": "none"});
            $(".respons2_hover").css({"display": "none"});

            respons_on = false;
        }
    });
    $(".respons2").click(function() {
        if(!respons_on && !r1_on && r2_on && !is_rbtn) {
            respons_on = true;

            $(".res_clicked2").stop(true, true).animate({"opacity": "0"}, 300, function() {
                $(this).css({"display": "none"});

                $(".res_default").css({"display": "block"});
                $(".res_default").stop(true, true).animate({"opacity": "1"}, 500);
            });

            $(this).find(".mobile_btn").css({"display": "none"});
            $(this).find(".pc_btn").css({"display": "none"});
            $(this).find(".tablet_btn").css({"display": "none"});

            $(this).stop(true, true).animate({"width": "60%", "height": "45%", "padding": "2%"}, 100, "easeOutCirc");
            $(this).find("h3").stop(true, true).animate({"font-size": "1.5vw"}, 100, "easeOutCirc");
            $(this).find("h2").stop(true, true).animate({"font-size": "2.5vw"}, 100, "easeOutCirc");
            $(this).find(".rdesc").stop(true, true).animate({"bottom": "20px", "width": "20%", "height": "40%", "opacity": "0"}, 100, "easeOutCirc");
        
            $(this).find(".mobile").animate({"left": "7%", "bottom": "5%"});
            $(this).find(".pc").animate({"left": "17%", "bottom": "10%"});
            $(this).find(".tablet").animate({"left": "50%", "bottom": "5%"});

            $(".respons1").stop(true, true).animate({"width": "60%", "height": "45%"}, 100, "easeOutCirc", function() {
                $(".respons1").find("div").not(".rshowcase").stop(true, true).animate({"opacity": "1"}, 200, "easeOutCirc", function() {
                    $(".respons1>.rdesc").css({"opacity": "0"});
                });
                
                $(".respons1_hover").css({"display": "block"});
                $(".respons2_hover").css({"display": "block"});
            });
            
            respons_on = false;
            r2_on = false;
        }
        is_rbtn = false;
    });
    $(".pc_btn").click(function(event) {
        is_rbtn = true;
        
        let url = $(this).attr("href");
        window.open(url, "", "width=1200, height=800, scrollbars=yes");
        event.preventDefault();
    });
    $(".tablet_btn").click(function(event) {
        is_rbtn = true;
        
        let url = $(this).attr("href");
        window.open(url, "", "width=900, height=700, scrollbars=yes");
        event.preventDefault();
    });
    $(".mobile_btn").click(function(event) {
        is_rbtn = true;
        
        let url = $(this).attr("href");
        window.open(url, "", "width=400, height=600, scrollbars=yes");
        event.preventDefault();
    });

        
        // ___________________________________________design
        // 웹 시안 페이지로 슬라이드
    function dslide_web() {
        $(".design_in").animate({"margin-left":"0%"}, 700, "easeInOutCirc");
    }
        // 선택 페이지로 슬라이드
    function dslide_switch() {
        $(".design_in").animate({"margin-left":"-25%"}, 700, "easeInOutCirc");
    }
        // 목업 페이지로 슬라이드
    function dslide_mockup() {
        $(".design_in").animate({"margin-left":"-50%"}, 700, "easeInOutCirc");
    }
        // middle switch shrink
    function switch_shrink() {
        $(".dswitch").animate({"width":"10%", "left":"45%"}, 700, "easeInOutCirc");
    }
        // middle switch shrink
    function switch_expand() {
        $(".dswitch").animate({"width":"50%", "left":"25%"}, 700, "easeInOutCirc");
    }

        // switch section :: middle
    $(".switchm>.dtoweb").click(function() {
        dslide_web(); switch_shrink();
        $(".switchm").animate({"opacity": "0"}, 500, function() {
            $(".switchm").css({"display": "none"});
            $(".switchl").css({"display": "block"});
            $(".switchl").stop(true, true).animate({"opacity": "1"}, 600);
        })
    });
    $(".switchm>.dtomock").click(function() {
        dslide_mockup(); switch_shrink();
        $(".switchm").animate({"opacity": "0"}, 500, function() {
            $(".switchm").css({"display": "none"});
            $(".switchr").css({"display": "block"});
            $(".switchr").stop(true, true).animate({"opacity": "1"}, 600);
        })
    });

        // switch section :: left
    $(".switchl>.dtoswit").click(function() {
        dslide_switch(); switch_expand();
        $(".switchl").animate({"opacity": "0"}, 500, function() {
            $(".switchl").css({"display": "none"});
            $(".switchm").css({"display": "block"});
            $(".switchm").stop(true, true).animate({"opacity": "1"}, 300);
        })
    });
    $(".switchl>.dtomock").click(function() {
        dslide_mockup();
        $(".switchl").animate({"opacity": "0"}, 500, function() {
            $(".switchl").css({"display": "none"});
            $(".switchr").css({"display": "block"});
            $(".switchr").stop(true, true).animate({"opacity": "1"}, 600);
        })
    });

        // switch section :: right
    $(".switchr>.dtoswit").click(function() {
        dslide_switch(); switch_expand();
        $(".switchr").animate({"opacity": "0"}, 500, function() {
            $(".switchr").css({"display": "none"});
            $(".switchm").css({"display": "block"});
            $(".switchm").stop(true, true).animate({"opacity": "1"}, 300);
        })
    });
    $(".switchr>.dtoweb").click(function() {
        dslide_web();
        $(".switchr").animate({"opacity": "0"}, 500, function() {
            $(".switchr").css({"display": "none"});
            $(".switchl").css({"display": "block"});
            $(".switchl").stop(true, true).animate({"opacity": "1"}, 600);
        })
    });

        // web design 
    let is_full = false; //check fullsized or not
    $(".dweb_box").click(function() {
        is_modal = true;
        
        dweb_index = $(this).parent().index();
        $(".dweb_designw img, .dweb_designh img").attr("src", `image/dweb${dweb_index + 1}.jpg`);

        $("#dweb_modal").css({"display": "block"});
        $("#dweb_modal").stop(true, true).animate({"opacity": "1"}, 150);
    });
    $(".dweb_exit").click(function() {
        is_modal = false;
        $("#dweb_modal").stop(true, true).animate({"opacity": "0"}, 150, function() {
            $("#dweb_modal").css({"display": "none"});

            // full/ex reset
            is_full = false;
            $(".dweb_designh").css({"display": "none"});
            $(".dweb_designw").css({"display": "block"});
            $(this).find("span").text("fullscreen");
            $(this).find("p").text("전체보기");
        });
    });
    $(".dweb_fullex").click(function() {
        if(!is_full) { // ex -> full
            is_full = true;
            $(".dweb_designw").css({"display": "none"});
            $(".dweb_designh").css({"display": "block"});
            $(this).find("span").text("fullscreen_exit");
            $(this).find("p").text("확대보기");
        } else { // full -> ex
            is_full = false;
            $(".dweb_designh").css({"display": "none"});
            $(".dweb_designw").css({"display": "block"});
            $(this).find("span").text("fullscreen");
            $(this).find("p").text("전체보기");
        }
    });

        // design mockup
    function mockup_where(img_seq) {$(img_seq).css({"transform": "scale(1.1)"});}
    function mockup_ok(img_seq) {$(img_seq).css({"transform": "scale(1.0)"});}
    $(".mockup_btn").click(function() {
        mockup_where($(".mock_thumb5"));
        setTimeout( function() {
            mockup_ok($(".mock_thumb5"));
            mockup_where($(".mock_thumb3"));
        }, 100);
        setTimeout( function() {
            mockup_ok($(".mock_thumb3"));
            mockup_where($(".mock_thumb9"));
        }, 200);
        setTimeout( function() {
            mockup_ok($(".mock_thumb9"));
            mockup_where($(".mock_thumb2"));
        }, 300);
        setTimeout( function() {
            mockup_ok($(".mock_thumb2"));
            mockup_where($(".mock_thumb4"));
        }, 400);
        setTimeout( function() {
            mockup_ok($(".mock_thumb4"));
            mockup_where($(".mock_thumb6"));
        }, 500);
        setTimeout( function() {
            mockup_ok($(".mock_thumb6"));
            mockup_where($(".mock_thumb8"));
        }, 600);
        setTimeout( function() {
            mockup_ok($(".mock_thumb8"));
            mockup_where($(".mock_thumb7"));
        }, 700);
        setTimeout( function() {
            mockup_ok($(".mock_thumb7"));
            mockup_where($(".mock_thumb1"));
        }, 800);
        setTimeout( function() {
            mockup_ok($(".mock_thumb1"));
            mockup_where($(".mock_thumb10"));
        }, 900);
        setTimeout( function() {
            mockup_ok($(".mock_thumb10"));
        }, 1000);
    });

    // mockup modal
    let is_orig = false; //check original or not
    let dmockup_index = 0;
    $(".dmockup_in>img").click(function() {
        is_modal = true;
        
        dmockup_index = $(this).index() - 2;
        $(".mockuped img").attr("src", `image/mockup/mockup${dmockup_index + 1}.jpg`);
        $(".mockup_origin img").attr("src", `image/mockup/origin/mockup${dmockup_index + 1}.jpg`);

        $("#mockup_modal").css({"display": "block"});
        $("#mockup_modal").stop(true, true).animate({"opacity": "1"}, 150);
    });
    $(".mockup_exit").click(function() {
        is_modal = false;
        $("#mockup_modal").stop(true, true).animate({"opacity": "0"}, 150, function() {
            $("#mockup_modal").css({"display": "none"});

            // full/ex reset
            is_orig = false;
            $(".mockup_origin").css({"display": "none"});
            $(".mockuped").css({"display": "block"});
            $(".mockup_orig").find("span").text("check_box_outline_blank"); 
            
            $(".mockuped img").attr("src", "");
            $(".mockup_origin img").attr("src", "");
        });
    });
    $(".mockup_orig").click(function() {
        if(!is_orig) { // mockup -> orig
            is_orig = true;
            $(".mockuped").css({"display": "none"});
            $(".mockup_origin").css({"display": "block"});
            $(".mockup_orig").find("span").text("check_box");
        } else { // orig -> mockup
            is_orig = false;
            $(".mockup_origin").css({"display": "none"});
            $(".mockuped").css({"display": "block"});
            $(".mockup_orig").find("span").text("check_box_outline_blank");
        }
    });
    $(".mockup_move .left").click(function() {
        if(dmockup_index > 0) {
            if(--dmockup_index == 3) {
                $(".mockup_origin img").css({"height":"auto","width":"100%"});
            } else {
                $(".mockup_origin img").css({"height":"100%","width":"auto"});
            }
            $(".mockuped img").attr("src", "");
            $(".mockup_origin img").attr("src", "");

            $(".mockuped img").attr("src", `image/mockup/mockup${dmockup_index + 1}.jpg`);
            $(".mockup_origin img").attr("src", `image/mockup/origin/mockup${dmockup_index + 1}.jpg`);
        }
    });
    $(".mockup_move .right").click(function() {
        if(dmockup_index < 9) {
            if(++dmockup_index == 3) {
                $(".mockup_origin img").css({"height":"auto","width":"100%"});
            } else {
                $(".mockup_origin img").css({"height":"100%","width":"auto"});
            }
            $(".mockuped img").attr("src", "");
            $(".mockup_origin img").attr("src", "");
            
            $(".mockuped img").attr("src", `image/mockup/mockup${dmockup_index + 1}.jpg`);
            $(".mockup_origin img").attr("src", `image/mockup/origin/mockup${dmockup_index + 1}.jpg`);
        }
    });

        // ___________________________________________plan
    let plan_index = 0;
    let plan_mindex = 0;
    $(".item").click(function() {
        // is_modal = true;

        plan_mindex = $(this).index();
        switch(plan_mindex) {
            case 0 :
                is_modal = true;
        
                $(".plan_sketch img").attr("src", "image/plan1.jpg");
                $(".plan_result img").attr("src", "image/planed1.jpg");

                $("#plan_modal").css({"display": "block"});
                $("#plan_modal").stop(true, true).animate({"opacity": "1"}, 150);
                break;
            case 1 :
                is_modal = true;
        
                $(".plan_sketch img").attr("src", "image/plan2.png");
                $(".plan_result img").attr("src", "image/planed2.jpg");
                
                $("#plan_modal").css({"display": "block"});
                $("#plan_modal").stop(true, true).animate({"opacity": "1"}, 150);
                break;
            // case 2 :
            //     $(".plan_sketch img").attr("src", "image/plan3.png");
            //     $(".plan_result img").attr("src", "image/planed3.png");
            //     break;
            default:
                break;
        }

        // $("#plan_modal").css({"display": "block"});
        // $("#plan_modal").stop(true, true).animate({"opacity": "1"}, 150);
    });
    $(".plan_exit").click(function() {
        is_modal = false;
        $("#plan_modal").stop(true, true).animate({"opacity": "0"}, 150, function() {
            $("#plan_modal").css({"display": "none"});
        });
    });


});
