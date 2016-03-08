import React from 'react';
import {FeatureBoard} from 'app/feature';


export class FeatureSection extends React.Component {
  render() {
    return (
      <section className="feature">
        <FeatureBoard current={this.props.children} />
      </section>
    );
  }
}

export default FeatureSection;
