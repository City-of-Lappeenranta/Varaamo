import React, { Component, PropTypes } from 'react';
import ReactGA from 'react-ga';
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
import iconSale from './images/icon-pitaanayttely.svg';
import iconPerform from './images/icon-esiintya.svg';
import iconSports from './images/icon-liikkua.svg';
import iconSauna from './images/icon-saunoa.svg';
import iconClub from './images/icon-valmistaaesineita.svg';
import iconMeeting from './images/icon-pitaakokouksen.svg';
import iconCamp from './images/icon-vuokratatapahtumatarvikkeita.svg';

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
    ReactGA.pageview('Etusivu');
    this.props.actions.fetchPurposes();
  }

  handleSearch(value = '') {
    browserHistory.push(`/search?search=${value}`);
  }

  handleBannerClick(purpose) {
    const type = 'Tyyppi: ';
    ReactGA.event({
      category: 'Click by category on front page',
      action: type + purpose,
    });
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
            <h1><span>Varaamo</span></h1>
            <h5><span>{t('HomePage.contentSubTitle')}</span></h5>
          </div>
          <HomeSearchBox onSearch={this.handleSearch} />
        </div>
        <div className="app-HomePage__koro" />
        <PageWrapper className="app-HomePageContent" title={t('HomePage.title')}>
          <div className="HomeArticle">
            <h4>{t('HomePage.helpTextTitle')}</h4>
            <p>{t('HomePage.helpText1')}</p>
            <p>{t('HomePage.helpText2')}</p>
          </div>
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
