// JavaScript goes here

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  const targetSelection = document.querySelector(targetId);
  const originalTop =
    Math.floor(targetSelection.getBoundingClientRect().top)-200;
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
}

window.addEventListener("load", function () {
  const posts = document.querySelectorAll("section");
  let postTops = [];
  let pageTop;
  let counter = 1;
  let prevCounter = 1;
  let doneResizing;

  posts.forEach((post) => {
    postTops.push(
      Math.floor(post.getBoundingClientRect().top + window.scrollY)
    );
  });
  console.log(postTops)
  window.addEventListener("scroll", function () {
    pageTop = window.scrollY + 275;
    
    if (pageTop > postTops[counter]) {
      console.log(pageTop,postTops[counter])
      counter++;
    } else if (counter > 1 && pageTop < postTops[counter - 1]) counter--;

    if(counter !== prevCounter) {
        navLinks.forEach((link) => {
            link.removeAttribute('class')
          });

          const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
          thisLink.className = 'selected';
          prevCounter = counter;
    }
  });

  window.addEventListener('resize', function() {
    clearTimeout(doneResizing);
    doneResizing = setTimeout(function(){
        resetPagePosition()
    },500)
  })
  function resetPagePosition() {
    postTops = []
    posts.forEach((post) => {
        postTops.push(
          Math.floor(post.getBoundingClientRect().top + window.scrollY)
        );
      });
    const pagePosition = window.scrollY + 275;
    counter = 0;
    postTops.forEach(post => {
        if(pagePosition > post) {
            counter++;
        }
        navLinks.forEach((link) => {
            link.removeAttribute('class')
          });
            const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
          thisLink.className = 'selected';
          
    })
  }
});
