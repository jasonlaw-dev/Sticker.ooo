import React from 'react';

export const Nav00DataSource = {
  logo: {
    className: 'header0-logo',
    children: '/static/images/logo.png',
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {name: 'item0', a: {children: {en: 'Item1', zh: 'Item1'}, href: '/'}}
    ],
  },
  mobileMenu: {className: 'header0-mobile-menu'},
};
export const Banner00DataSource = {
  wrapper: {className: 'banner0'},
  textWrapper: {className: 'banner0-text-wrapper home-banner-area'},
  title: {
    className: 'banner0-title',
  },
  content: {
    className: 'banner0-content',
  },
  bannerImg: {
    className: 'img-fluid',
    style: {width: 300},
    src: '/static/images/banner-img.png'
  },
  button: {className: 'banner0-button', children: 'Learn More'},
};

export const FactArea00DataSource = {
  wrapper: {className: 'home-page-wrapper content0-wrapper'},
  page: {className: 'home-page content0'},
  OverPack: {playScale: 0.3, className: ''},
  titleWrapper: {
    className: 'title-wrapper',
    children: [{name: 'title', children: {en: '我地已經收錄左', zh: '我地已經收錄左'}}],
  },
  block: {
    className: 'block-wrapper',
    children: [
    ],
  },

};

export const FooterDataSource = {
  logo: {
    children: '/static/images/logo.png'
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {name: 'item0', a: {children: {en: 'Terms & Conditions', zh: '服務條款'}, href: '/tnc'}}
    ],
  },
  mobileMenu: {className: 'header0-mobile-menu'},
}
