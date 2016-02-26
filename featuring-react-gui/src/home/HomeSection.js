import React from 'react';
import {connect} from 'react-redux';
import store from 'app/root/store';
import {FeatureSection} from 'app/feature';
import {Header} from 'app/header';
import {Footer} from 'app/footer';


export function HomeSection() {
  return (
    <div className="base home">
      <Header />
      <FeatureSection />
      <Footer />
    </div>
  );
}

export default connect()(HomeSection);
