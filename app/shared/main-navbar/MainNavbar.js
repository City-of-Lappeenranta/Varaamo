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
          <Link to="/">
            Varaamo
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeKey={activeLink}>
          <LinkContainer to={getSearchPageUrl()}>
            <NavItem eventKey="search" onClick={clearSearchResults}>
              {t('Navbar.search')}
            </NavItem>
          </LinkContainer>
          {isLoggedIn && (
            <LinkContainer to="/admin-resources">
              <NavItem eventKey="admin-resources">
                { isAdmin ? t('Navbar.adminResources') : t('Navbar.userFavorites') }
              </NavItem>
            </LinkContainer>
          )}
          {isLoggedIn && (
            <LinkContainer to="/my-reservations">
              <NavItem eventKey="my-reservations">
                {t('Navbar.userResources')}
              </NavItem>
            </LinkContainer>
          )}
          <NavDropdown eventKey={3} id="basic-nav-dropdown" title={t('Navbar.aboutLink')} >
            <MenuItem eventKey={3.1} href="https://drive.google.com/file/d/1PT_abLmfH84mFp_3NuYj03ngBYDieI2S" target="_blank"> {t('Navbar.serviceInfo')} </MenuItem>
            <MenuItem eventKey={3.2} href="https://drive.google.com/file/d/1iYLpAPQYPRqGoxo8JXs-ds-c8-7jd9p-" target="_blank"> {t('Navbar.presentation')} </MenuItem>
          </NavDropdown>
          <li role="presentation">
            <a action="push" href="https://drive.google.com/open?id=1w7vuyYuB7KDJcAuEicH3jb7oOW4NcLdI" rel="noopener noreferrer" target="_blank"> {t('Navbar.privacy')} </a>
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
