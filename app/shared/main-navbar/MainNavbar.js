import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { injectT } from 'i18n';
import { getSearchPageUrl } from 'utils/searchUtils';

function MainNavbar(props) {
  const {
    activeLink,
    clearSearchResults,
    isAdmin,
    isLoggedIn,
    t,
  } = props;

  return (
    <Navbar className="app-MainNavbar" fluid>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          <Link title="Varaamo" to="/">
            Varaamo
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeKey={activeLink}>
          <LinkContainer to={getSearchPageUrl()}>
            <NavItem eventKey="search" onClick={clearSearchResults} title={t('Navbar.search')}>
              {t('Navbar.search')}
            </NavItem>
          </LinkContainer>
          {isLoggedIn && (
            <LinkContainer to="/admin-resources">
              <NavItem eventKey="admin-resources" title={isAdmin ? t('Navbar.adminResources') : t('Navbar.userFavorites')}>
                { isAdmin ? t('Navbar.adminResources') : t('Navbar.userFavorites') }
              </NavItem>
            </LinkContainer>
          )}
          {isLoggedIn && (
            <LinkContainer to="/my-reservations">
              <NavItem eventKey="my-reservations" title={t('Navbar.userResources')}>
                {t('Navbar.userResources')}
              </NavItem>
            </LinkContainer>
          )}
          <NavDropdown eventKey={3} id="basic-nav-dropdown" title={t('Navbar.aboutLink')} >
            <MenuItem eventKey={3.1} href="https://varaamo.lappeenranta.fi/_assets/Tietoa%20Varaamo-palvelusta%2020190528.pdf" target="_blank" title={t('Navbar.serviceInfo')}> {t('Navbar.serviceInfo')} </MenuItem>
            <MenuItem eventKey={3.2} href="https://varaamo.lappeenranta.fi/_assets/Varaamo-tilavarauspalvelun%20esittely%2020190528.pdf" target="_blank" title={t('Navbar.presentation')}> {t('Navbar.presentation')} </MenuItem>
            <MenuItem eventKey={3.3} href="https://varaamo.lappeenranta.fi/_assets/PALVELUN%20KÄYTTÖSOPIMUS%2020190528.pdf" target="_blank" title={t('Navbar.agreement')}> {t('Navbar.agreement')} </MenuItem>
            <MenuItem eventKey={3.4} href="https://varaamo.lappeenranta.fi/_assets/Varaamon%20varausten%20peruutussäännöt%2020190528.pdf" target="_blank" title={t('Navbar.cancellation')}> {t('Navbar.cancellation')} </MenuItem>
            <MenuItem eventKey={3.5} href="https://varaamo.lappeenranta.fi/_assets/20190927%20Saavutettavuusseloste%20Varaamo.htm" target="_blank" title={t('Navbar.accessibility')}> {t('Navbar.accessibility')} </MenuItem>
          </NavDropdown>
          <li role="presentation">
            <a action="push" href="https://varaamo.lappeenranta.fi/_assets/Varaamo%20LPR%20Tietosuojaseloste%2020181129.pdf" rel="noopener noreferrer" target="_blank" title={t('Navbar.privacy')}> {t('Navbar.privacy')} </a>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

MainNavbar.propTypes = {
  activeLink: PropTypes.string.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default injectT(MainNavbar);
