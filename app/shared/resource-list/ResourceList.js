import React, { PropTypes } from 'react';

import ResourceCard from 'shared/resource-card';


function ResourceList({ date, emptyMessage, location, resourceIds, toggleMap, sResMap, hResMap }) {
  function renderResourceListItem(resourceId) {
    return (
      <ResourceCard
        date={date}
        hResMap={hResMap}
        key={resourceId}
        location={location}
        resourceId={resourceId}
        sResMap={sResMap}
        toggleMap={toggleMap}
      />
    );
  }
  if (!resourceIds.length) {
    return emptyMessage ? <p>{emptyMessage}</p> : <div />;
  }

  return (
    <div className="resource-list">
      {resourceIds.map(renderResourceListItem)}
    </div>
  );
}

ResourceList.propTypes = {
  toggleMap: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string,
  location: PropTypes.object.isRequired,
  resourceIds: PropTypes.array.isRequired,
  sResMap: PropTypes.func.isRequired,
  hResMap: PropTypes.func.isRequired,
};

export default ResourceList;
