import React, {PropTypes} from 'react';

export const featureDataType = React.PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  deadline: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  ticketUrl: PropTypes.string.isRequired,
  clientId: PropTypes.number.isRequired
});
