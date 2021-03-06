import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import ResourceCard from 'shared/resource-card';
import selector from './ResourceCompactListSelector';

// const selectedUnitIdSelector = state => state.ui.search.unitId;

export class UnconnectedResourceCompactList extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    resourceIds: PropTypes.array.isRequired,
    unitId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const tmp = this.props.resourceIds.indexOf(this.props.unitId);
    this.state = { resourcePosition: tmp === -1 ? 0 : tmp };
  }
/*
  state = {
    resourcePosition: this.tmp === -1 ? 0 : this.tmp,
  }
*/
  componentWillReceiveProps() {
    const tmp = this.props.resourceIds.indexOf(this.props.unitId);
    this.setState({
      resourcePosition: tmp === -1 ? 0 : tmp,
    });
  }

  onPreviousResource = () => {
    // Javascript mod operator (%) does not work as expected an the module of a negative number
    // is calculated like -(i % i_max) which would lead on a negative resourcePosition.
    this.setState({
      resourcePosition: (
        (this.state.resourcePosition - 1) + this.props.resourceIds.length
      ) % this.props.resourceIds.length,
    });
  }

  onNextResource = () => {
    this.setState({
      resourcePosition: (this.state.resourcePosition + 1) % this.props.resourceIds.length,
    });
  }

  render() {
    const { resourcePosition } = this.state;
    const { resourceIds } = this.props;
    const resourceIdsLength = resourceIds.length;
    return (
      <div className="app-ResourceCompactList">
        {Boolean(this.props.resourceIds.length - 1) &&
          <Button
            bsStyle="primary"
            className="app-ResourceCompactList_arrow app-ResourceCompactList_arrow-left"
            disabled={resourcePosition === 0}
            onClick={this.onPreviousResource}
          />
        }
        <ResourceCard
          date={this.props.date}
          location={this.props.location}
          resourceId={resourceIds[resourcePosition]}
          stacked={Boolean(resourceIdsLength - 1)}
        />
        {Boolean(resourceIdsLength - 1) &&
          <Button
            bsStyle="primary"
            className="app-ResourceCompactList_arrow app-ResourceCompactList_arrow-right"
            disabled={resourcePosition === resourceIdsLength - 1}
            onClick={this.onNextResource}
          />
        }
      </div>
    );
  }
}


export default connect(selector)(UnconnectedResourceCompactList);
