import { expect } from 'chai';
import React from 'react';
import { Link } from 'react-router';

import { shallowWithIntl } from 'utils/testUtils';
import { UnconnectedResourceInfo as ResourceInfo, selector } from './ResourceInfoContainer';

function getState() {
  return {
    data: {
      resources: {
        123456: {
          id: '123456',
          name: { fi: 'Resource Name' },
          extra: 'attribute',
          isFavorite: false,
          peopleCapacity: 9,
          public: true,
        },
      },
    },
  };
}

describe('shared/availability-view/ResourceInfoContainer', () => {
  function getWrapper(props) {
    const defaults = {
      date: '2017-01-02',
      id: 'r-1',
      isFavorite: false,
      isSelected: false,
      name: 'Resource name',
      peopleCapacity: 19,
      public: true,
    };
    return shallowWithIntl(<ResourceInfo {...defaults} {...props} />);
  }

  it('renders a div.resource-info', () => {
    const wrapper = getWrapper();
    expect(wrapper.is('div.resource-info')).to.be.true;
  });

  it('has selected class if isSelected', () => {
    const wrapper = getWrapper({ isSelected: true });
    expect(wrapper.is('.resource-info-selected')).to.be.true;
  });

  it('renders the name and link to resource page', () => {
    const date = '2017-02-03';
    const link = getWrapper({ date, id: 'r-1', name: 'Room 1' }).find(Link);
    expect(link).to.have.length(1);
    expect(link.prop('to')).to.equal(`/resources/r-1?date=${date}`);
    expect(link.prop('children')).to.equal('Room 1');
  });

  it('renders the capacity in details', () => {
    const details = getWrapper({ peopleCapacity: 3 }).find('.details');
    expect(details).to.have.length(1);
    expect(details.text()).to.contain('3');
  });

  it('renders unpublished label if public is false', () => {
    const label = getWrapper({ public: false }).find('.unpublished-label');
    expect(label).to.have.length(1);
  });

  it('does not render unpublished label if public is true', () => {
    const label = getWrapper({ public: true }).find('.unpublished-label');
    expect(label).to.have.length(0);
  });

  describe('selector', () => {
    function getSelected(props) {
      const defaults = { id: '123456' };
      return selector()(getState(), { ...defaults, ...props });
    }

    it('returns resource info', () => {
      const actual = getSelected();
      expect(actual).to.deep.equal({
        name: 'Resource Name',
        peopleCapacity: 9,
        public: true,
      });
    });
  });
});
