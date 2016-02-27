import React from 'react';
import {connect} from 'react-redux';
import store from 'app/root/store';
import {FeatureSection} from 'app/feature';
import {Header} from 'app/header';
import {Footer} from 'app/footer';


export function HomeSection({children}) {
  return (
    <div className="base home">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default connect()(HomeSection);
