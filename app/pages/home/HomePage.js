import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import camelCase from 'lodash/camelCase';

import { fetchPurposes } from 'actions/purposeActions';
import { injectT } from 'i18n';
import PageWrapper from 'pages/PageWrapper';
import HomeSearchBox from './HomeSearchBox';
import homePageSelector from './homePageSelector';
import iconSale from './images/sale.svg';
import iconPerform from './images/meet.svg';
import iconSports from './images/sport.svg';
import iconSauna from './images/sauna.svg';
import iconClub from './images/club.svg';
import iconMeeting from './images/meeting.svg';
import iconCamp from './images/camp.svg';

const purposeIcons = {
  performOrPlay: iconPerform,
  move: iconSports,
  exhibitOrSellItems: iconSale,
  goToSauna: iconSauna,
  makeOrRepairThings: iconClub,
  haveAMeetingOrWork: iconMeeting,
  rentEventMaterial: iconCamp,
};

class UnconnectedHomePage extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBannerClick = this.handleBannerClick.bind(this);
    this.renderPurposeBanner = this.renderPurposeBanner.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchPurposes();
  }

  handleSearch(value = '') {
    browserHistory.push(`/search?search=${value}`);
  }

  handleBannerClick(purpose) {
    browserHistory.push(`/search?purpose=${purpose}`);
  }

  renderPurposeBanner(purpose) {
    const { t } = this.props;
    const image = purposeIcons[camelCase(purpose.value)];
    return (
      <Col className="app-HomePageContent__banner" key={purpose.value} md={3} sm={6} xs={6}>
        <div>
          <img alt={purpose.label} src={image} />
          <h5>{purpose.label}</h5>
          <div className="app-HomePageContent__banner-action">
            <Button
              bsStyle="primary"
              className="app-HomePageContent__button"
              onClick={() => this.handleBannerClick(purpose.value)}
              type="submit"
            >
              {t('HomePage.buttonText')}
            </Button>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    const { isFetchingPurposes, purposes, t } = this.props;
    return (
      <div className="app-HomePage">
        <div className="app-HomePage__content container">
          <div className="back-Opacity">
            <h1><span>Varaamo –</span></h1>
            <h1><span>{t('HomePage.contentTitle')}</span></h1>
            <h5><span>{t('HomePage.contentSubTitle')}</span></h5>
          </div>
          <HomeSearchBox onSearch={this.handleSearch} />
        </div>
        <div className="app-HomePage__koro" />
        <PageWrapper className="app-HomePageContent" title={t('HomePage.title')}>
          <h4>{t('HomePage.bannersTitle')}</h4>
          <Loader loaded={!isFetchingPurposes}>
            <div className="app-HomePageContent__banners">
              {purposes.map(this.renderPurposeBanner)}
            </div>
          </Loader>
        </PageWrapper>
      </div>
    );
  }
}

UnconnectedHomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  isFetchingPurposes: PropTypes.bool.isRequired,
  purposes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

UnconnectedHomePage = injectT(UnconnectedHomePage); // eslint-disable-line

function mapDispatchToProps(dispatch) {
  const actionCreators = { fetchPurposes };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export { UnconnectedHomePage };
export default connect(homePageSelector, mapDispatchToProps)(UnconnectedHomePage);
