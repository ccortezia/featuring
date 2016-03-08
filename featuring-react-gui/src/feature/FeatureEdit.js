import React from 'react';
import {Link} from 'react-router';
import FeatureEditForm from './FeatureEditForm';
import {browserHistory} from 'react-router';
import store from 'app/root/store';
import {ackErrorAction} from 'app/error/actions';
import {createErrorAlert} from 'app/common/alert';

import {
  remoteRequestFeatureUpdateAction,
  remoteRequestFeatureListAction}
  from 'app/feature/actions';


export class FeatureEdit extends React.Component {
  constructor({props}) {
    super({props});
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.acknowledgeError = this.acknowledgeError.bind(this);
    this.errorBanner = this.errorBanner.bind(this);
  }

  componentWillUnmount() {
    // setTimeout is (clearly) a workaround for a non understood problem
    //  when disapatching synchronously from inside this method.
    setTimeout(this.acknowledgeError);
  }

  onSubmit(submitedData) {
    const origin = this.props.origin;
    const data = Object.assign({}, submitedData, {id: this.props.data.id});
    store.dispatch(remoteRequestFeatureUpdateAction({data, origin}))
      .then((action) => action.data)
      .then(() => store.dispatch(remoteRequestFeatureListAction({origin})))
      .then((result) => result && browserHistory.push(`/features/${data.id}`));
  }

  onCancel() {
    browserHistory.push(`/features/${this.props.data.id}`);
  }

  acknowledgeError() {
    store.dispatch(ackErrorAction({origin: this.props.origin}))
  }

  errorBanner() {
    return this.props.error && !this.props.error.ack
      && createErrorAlert(this.props.error, this.acknowledgeError);
  }

  render() {
    return (
      <div className="panel panel-default panel-feature-main panel-feature-create">
        {this.errorBanner()}
        <h2>Edit this feature request</h2>
        <FeatureEditForm
          initialValues={this.props.data}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel} />
      </div>
    );
  }
}

export default FeatureEdit;
