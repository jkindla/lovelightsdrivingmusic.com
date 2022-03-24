
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



const slide = {
    main : null,
    elementImg : null,
    imgSelected : 0,
    nextSlide: function (){
        if (this.imgSelected != null)
        {
            if (this.imgSelected < (this.elementImg.length - 1))
            {
                this.imgSelected++;
                this.normalizeSlide();
            }
        }
    },
    prevSlide: function (){
        if (this.imgSelected != null)
        {
            if (this.imgSelected > 0)
            {
                this.imgSelected--;
                this.normalizeSlide();
            }
        }
    },
    normalizeSlide: function (){

        for (num = 0; num < this.elementImg.length; num++)
        {
            this.elementImg[num].classList.remove("hideLeft","prevLeftSecond","prev","selected","next","nextRightSecond","hideRight");
        }

        this.elementImg[this.imgSelected].classList.add("selected");

        if (this.imgSelected > 2)
        {
            this.elementImg[this.imgSelected-2].classList.add("hideLeft");
            this.elementImg[this.imgSelected-2].classList.add("prevLeftSecond");
            this.elementImg[this.imgSelected-1].classList.add("prev");
        }
        else if (this.imgSelected > 1)
        {
            this.elementImg[this.imgSelected-2].classList.add("prevLeftSecond");
            this.elementImg[this.imgSelected-1].classList.add("prev");
        }
        else if (this.imgSelected > 0)
        {
            this.elementImg[this.imgSelected-1].classList.add("prev");
        }

        if ((this.imgSelected + 3) < this.elementImg.length)
        {
            this.elementImg[this.imgSelected+3].classList.add("hideRight");
            this.elementImg[this.imgSelected+2].classList.add("nextRightSecond");
            this.elementImg[this.imgSelected+1].classList.add("next");
        }
        else if ((this.imgSelected + 2) < this.elementImg.length)
        {
            this.elementImg[this.imgSelected+2].classList.add("nextRightSecond");
            this.elementImg[this.imgSelected+1].classList.add("next");
        }
        else if((this.imgSelected + 1) < this.elementImg.length)
        {
            this.elementImg[this.imgSelected+1].classList.add("next");
        }
    }
}

window.onload = () => {

    slide.main = document.getElementById("carousel");
    slide.elementImg = slide.main.getElementsByClassName("slideImg");

    for (num = 0; num < slide.elementImg.length; num++)
    {
        slide.elementImg[num].setAttribute("img-number", num);
        
        slide.elementImg[num].addEventListener("click", (event) => {
            slide.imgSelected = parseInt(event.target.parentElement.getAttribute("img-number"));
            slide.normalizeSlide();
        });

        if (slide.elementImg[num].classList.contains("selected"))
        {
            slide.imgSelected = num;
        }
    }

    document.getElementById("prev").addEventListener("click", () => {slide.prevSlide()});
    document.getElementById("next").addEventListener("click", () => {slide.nextSlide()});

}






