import React from 'react';
import {Link} from 'react-router';
import FeatureCreateForm from './FeatureCreateForm';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {ackErrorAction} from 'app/error/actions';
import {createErrorAlert} from 'app/common/alert';

import {
  remoteRequestFeatureCreateAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export class FeatureCreate extends React.Component {

  constructor({props}) {
    super({props});
    this.state = {creationForm: null};
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.acknowledgeError = this.acknowledgeError.bind(this);
    this.errorBanner = this.errorBanner.bind(this);
  }

  componentWillUnmount() {
    // setTimeout is (clearly) a workaround for a non understood problem
    //  when disapatching synchronously from inside this method.
    setTimeout(this.acknowledgeError);
  }

  onSubmit(data) {
    let nid;
    const origin = this.props.origin;
    store.dispatch(remoteRequestFeatureCreateAction({data, origin}))
      .then((action) => nid = action.data.id)
      .then(() => store.dispatch(remoteRequestFeatureListAction({origin})))
      .then((result) => result && browserHistory.push(`/features/${nid}`));
  }

  onCancel() {
    browserHistory.push('/features');
  }

  acknowledgeError() {
    store.dispatch(ackErrorAction({origin: this.props.origin}));
  }

  errorBanner() {
    return this.props.error && !this.props.error.ack
      && createErrorAlert(this.props.error, this.acknowledgeError);
  }

  render() {
    return (
      <div className="panel panel-default panel-feature-main panel-feature-create">
        {this.errorBanner()}
        <h2>Create one more request</h2>
        <FeatureCreateForm
          onSubmit={this.onSubmit}
          onCancel={this.onCancel} />
      </div>
    );
  }
}

export default FeatureCreate;
