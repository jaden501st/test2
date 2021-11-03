import React from 'react';
import configureMockStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../../../../../test/jest/rendering';
import { defaultNetworksData } from '../networks-tab.constants';
import NetworksTabContent from '.';

const mockState = {
  metamask: {
    provider: {
      chainId: '0x539',
      nickname: '',
      rpcPrefs: {},
      rpcUrl: 'http://localhost:8545',
      ticker: 'ETH',
      type: 'localhost',
    },
  },
};

const renderComponent = (props) => {
  const store = configureMockStore([])(mockState);
  return renderWithProvider(<NetworksTabContent {...props} />, store);
};

const defaultNetworks = defaultNetworksData.map((network) => ({
  ...network,
  viewOnly: true,
}));

const props = {
  networkDefaultedToProvider: false,
  networkIsSelected: true,
  networksToRender: defaultNetworks,
  selectedNetwork: {
    rpcUrl: 'http://localhost:8545',
    chainId: '1337',
    ticker: 'ETH',
    label: 'LocalHost',
    blockExplorerUrl: '',
    viewOnly: false,
    rpcPrefs: {},
  },
  shouldRenderNetworkForm: true,
};

describe('NetworksTabContent Component', () => {
  it('should render networks tab content correctly', () => {
    const { queryByText, getByDisplayValue } = renderComponent(props);

    expect(queryByText('Ethereum Mainnet')).toBeInTheDocument();
    expect(queryByText('Ropsten Test Network')).toBeInTheDocument();
    expect(queryByText('Rinkeby Test Network')).toBeInTheDocument();
    expect(queryByText('Goerli Test Network')).toBeInTheDocument();
    expect(queryByText('Kovan Test Network')).toBeInTheDocument();

    expect(queryByText('Network Name')).toBeInTheDocument();
    expect(queryByText('New RPC URL')).toBeInTheDocument();
    expect(queryByText('Chain ID')).toBeInTheDocument();
    expect(queryByText('Currency Symbol')).toBeInTheDocument();
    expect(queryByText('Block Explorer URL')).toBeInTheDocument();
    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Save')).toBeInTheDocument();

    expect(getByDisplayValue(props.selectedNetwork.label)).toBeInTheDocument();
    expect(getByDisplayValue(props.selectedNetwork.rpcUrl)).toBeInTheDocument();
    expect(
      getByDisplayValue(props.selectedNetwork.chainId),
    ).toBeInTheDocument();
    expect(getByDisplayValue(props.selectedNetwork.ticker)).toBeInTheDocument();
    expect(
      getByDisplayValue(props.selectedNetwork.blockExplorerUrl),
    ).toBeInTheDocument();
    fireEvent.change(getByDisplayValue(props.selectedNetwork.label), {
      target: { value: 'LocalHost 8545' },
    });
    expect(getByDisplayValue('LocalHost 8545')).toBeInTheDocument();
    fireEvent.change(getByDisplayValue(props.selectedNetwork.chainId), {
      target: { value: '1' },
    });
    expect(
      queryByText('This Chain ID is currently used by the mainnet network.'),
    ).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(props.selectedNetwork.rpcUrl), {
      target: { value: 'test' },
    });
    expect(
      queryByText('URLs require the appropriate HTTP/HTTPS prefix.'),
    ).toBeInTheDocument();
  });
});
