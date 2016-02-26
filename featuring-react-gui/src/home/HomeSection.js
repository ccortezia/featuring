import React from 'react';
import {connect} from 'react-redux';
import store from 'app/root/store';


export function Header() {
  return (<header>HEADER</header>);
}


export function Footer() {
  return (<footer>FOOTER</footer>);
}


export function HomeSection() {
  return (
    <div className="base home">
      <Header />
      <div>Some content</div>
      <Footer />
    </div>
  );
}

export default connect()(HomeSection);
