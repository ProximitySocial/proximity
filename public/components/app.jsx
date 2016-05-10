const React = require('react');
const request = require('superagent');
const { IndexLink, Link } = require ('react-router');



// const Artists = require(__dirname + '/artists');
// const NavLink = require(__dirname + '/nav-link');

// //Header Images
// const logo = document.createElement('img');
// logo.src = require(__dirname + '/../imgs/siff-x.png')

// const buyPass = document.createElement('img');
// buyPass.src = require(__dirname + "/../imgs/buy-pass.png")

// //Additional Hero Images
// const dateImg = document.createElement('img');
// dateImg.src = require(__dirname + '/../imgs/2016.png')

// const mainLogo = document.createElement('img');
// mainLogo.src = require(__dirname + '/../imgs/logo-siff-x.png')

// const locationImg = document.createElement('img');
// locationImg.src = require(__dirname + '/../imgs/sea-wa.png')



module.exports = React.createClass({

  componentDidMount: function() {
   var hero = document.getElementById('hero'),
      nav = document.getElementById("nav-container"),
      navList = document.getElementById("fixed-nav"),
      navLogo = document.getElementById('logo-nav'),
      navBadge = document.getElementById('badgeContainer-nav'),
      viewportHeight = Math.max(window.innerHeight || 0),
      navOffsetTop = nav.offsetTop;


    var hasScrolled = function() {
        var fromTop = document.body.scrollTop || document.documentElement.scrollTop || 0;

        if (navOffsetTop < fromTop) {
            nav.classList.add('fixed-position');
            navBadge.classList.add('tablet-display-none');
            navList.classList.add('tablet-align-right');

            navLogo.classList.remove('img-nav');
            navBadge.classList.remove('img-nav');
            navBadge.classList.remove('tablet-tenth-col')

        } else {
            nav.classList.remove('fixed-position');
            navBadge.classList.remove('tablet-display-none');
            navList.classList.remove('tablet-align-right');


            navLogo.classList.add('img-nav');
            navBadge.classList.add('img-nav');
            navBadge.classList.add('tablet-tenth-col')

        }
      }

      window.addEventListener('scroll', hasScrolled);
  },

  render: function () {
    return (
      <section className="app">
        <header>
          <div className="thirdCol"></div>
          <div className="thirdCol">
            <img id="logo" src={logo.src } />
          </div>
          <div className="thirdCol" id="badgeContainer">
            <a href="http://myaccount.siff.net/shop/passes.aspx?PID=1464">
              <img id="pass-img" src={buyPass.src} />
            </a>
          </div>

      </header>
      <main>
        <section  id='hero'>
          <div id='splash'>
            <div>
              <img id="date" src={ dateImg.src } />
            </div>
            <div>
              <img id="main-logo" src={ mainLogo.src }/>
            </div>
            <div>
              <img id="location" src={ locationImg.src } />
            </div>
          </div>

          <section id="nav-container" className='nav-basic nav-initial'>
            <div className='quarterCol tablet-tenth-col'>
              <img id="logo-nav" className='img-nav' src={logo.src } />
            </div>
            <div className='halfCol tablet-eighty-col'>
              <nav id="fixed-nav">
                <ul>
                  <li><NavLink to="/program-highlights#top">program highlights</NavLink></li>

                  <li><p className="dash">-</p></li>
                  <li><NavLink to="/contact#top">contact</NavLink></li>
                </ul>
              </nav>
            </div>
            <div className='quarterCol img-nav tablet-tenth-col' id='badgeContainer-nav'>
              <a href="http://myaccount.siff.net/shop/passes.aspx?PID=1464">
                <img id="pass-img-nav" src={buyPass.src} />
              </a>
            </div>


          </section>
        </section>
      </main>
      {this.props.children}
    </section>
    )
  }
});
