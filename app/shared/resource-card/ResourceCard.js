import classnames from 'classnames';
import round from 'lodash/round';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import ReactGA from 'react-ga';
import { browserHistory, Link } from 'react-router';

import { injectT } from 'i18n';
import BackgroundImage from 'shared/background-image';
import { getMainImage } from 'utils/imageUtils';
import { getResourcePageUrl, getHourlyPrice } from 'utils/resourceUtils';
import ResourceAvailability from './ResourceAvailability';
import iconHome from '../../pages/home/images/A-tila.svg';
import iconMapMarker from '../../pages/home/images/D-sijainti.svg';
import iconTicket from '../../pages/home/images/C-hinta.svg';
import iconUser from '../../pages/home/images/B-hlomaara.svg';


class ResourceCard extends Component {

  handleSearchByType = () => {
    const filters = { search: this.props.resource.type.name };
    browserHistory.push(`/search?${queryString.stringify(filters)}`);
  }

  handleSearchByDistance = () => {
    const filters = { distance: this.props.resource.distance };
    browserHistory.push(`/search?${queryString.stringify(filters)}`);
  }

  handleSearchByPeopleCapacity = () => {
    const filters = { people: this.props.resource.peopleCapacity };
    browserHistory.push(`/search?${queryString.stringify(filters)}`);
  }

  handleSearchByUnit = () => {
    const filters = { unit: this.props.unit.id };
    browserHistory.push(`/search?${queryString.stringify(filters)}`);
  }

  handleLinkClick = () => {
    ReactGA.event({
      category: 'Click by resource on resource list page',
      action: this.props.resource.name,
    });
    const scrollTop = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const { location, hResMap } = this.props;
    const { pathname, search } = location;
    hResMap();
    browserHistory.replace({ pathname, search, state: { scrollTop } });
  }

  handleLinkClickMap = () => {
    const scrollTop = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const { location, sResMap } = this.props;
    const { pathname, search } = location;
    sResMap();
    browserHistory.replace({ pathname, search, state: { scrollTop } });
  }

  renderDistance(distance) {
    const km = distance / 1000;
    let formatedDistance = round(km);
    if (km < 10) {
      formatedDistance = round(km, 1);
    }
    return `${formatedDistance} km`;
  }

  render() {
    const { date, resource, t, unit } = this.props;

    return (
      <div
        className={classnames(
          'app-ResourceCard',
          { 'app-ResourceCard__stacked': this.props.stacked },
        )}

      >
        <Link
          className="app-ResourceCard__image-link"
          onClick={this.handleLinkClick}
          to={getResourcePageUrl(resource, date)}
        >
          <BackgroundImage
            height={420}
            image={getMainImage(resource.images)}
            width={700}
          />
        </Link>
        <div className="app-ResourceCard__content">
          <div className="app-ResourceCard__unit-name">
            <a
              className="app-ResourceCard__unit-name-link"
              onClick={this.handleSearchByUnit}
              role="button"
              tabIndex="-1"
            >
              <span>{unit.name}</span>
            </a>
            <ResourceAvailability date={date} resource={resource} />
          </div>
          <Link onClick={this.handleLinkClick} to={getResourcePageUrl(resource, date)}>
            <h2>{resource.name}</h2>
          </Link>
          <div className="app-ResourceCard__description">
            {resource.description}
          </div>
        </div>
        <div className="app-ResourceCard__info">
          <a
            className="app-ResourceCard__info-link app-ResourceCard__info-link-capitalize"
            onClick={this.handleSearchByType}
            role="button"
            tabIndex="-1"
          >
            <img alt={resource.type.name} className="app-ResourceCard__info-icon" src={iconHome} />
            <span className="app-ResourceCard__info-label">{resource.type ? resource.type.name : '\u00A0'}</span>
          </a>
          <a
            className="app-ResourceCard__info-link"
            onClick={this.handleSearchByPeopleCapacity}
            role="button"
            tabIndex="-1"
          >
            <img alt={resource.peopleCapacity} className="app-ResourceCard__info-icon" src={iconUser} />
            <span className="app-ResourceCard__info-label app-ResourceCard__peopleCapacity">
              {t('ResourceCard.peopleCapacity', { people: resource.peopleCapacity })}
            </span>
          </a>
          <div className="app-ResourceCard__info-link app-ResourceCard__info-detail">
            <img alt={resource.type.name} className="app-ResourceCard__info-icon" src={iconTicket} />
            <span className="app-ResourceCard__info-label app-ResourceCard__hourly-price">
              {getHourlyPrice(t, resource) || '\u00A0'}
            </span>
          </div>
          <Link className="app-ResourceCard__info-link" onClick={this.handleLinkClickMap} to={getResourcePageUrl(resource, date)}>
            <img alt={resource.type.name} className="app-ResourceCard__info-icon" src={iconMapMarker} />
            <span className="app-ResourceCard__info-label app-ResourceCard__street-address">{unit.streetAddress}</span>
            <span className="app-ResourceCard__info-label app-ResourceCard__zip-address">{unit.addressZip} {unit.municipality}</span>
          </Link>
        </div>
      </div>
    );
  }
}

ResourceCard.propTypes = {
  date: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  stacked: PropTypes.bool,
  t: PropTypes.func.isRequired,
  unit: PropTypes.object.isRequired,
  sResMap: PropTypes.func.isRequired,
  hResMap: PropTypes.func.isRequired,
};

export default injectT(ResourceCard);
