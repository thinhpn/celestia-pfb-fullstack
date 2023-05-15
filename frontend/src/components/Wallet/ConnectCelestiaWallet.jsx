import React from "react";
import "./ConnectCelestiaWallet.css";

export default function ConnectCelestiaWallet({ params, onKeplrAddress }) {
    async function add() {
        if (!window.keplr) {
            alert("Please install Keplr extension");
        } else {
            try {
                await window.keplr.experimentalSuggestChain({
                    chainId: params.chainId,
                    chainName: params.chainName,
                    rpc: params.rpc,
                    rest: params.rest,
                    bip44: {
                        coinType: 118,
                    },
                    bech32Config: {
                        bech32PrefixAccAddr: "celestia",
                        bech32PrefixAccPub: "celestia" + "pub",
                        bech32PrefixValAddr: "celestia" + "valoper",
                        bech32PrefixValPub: "celestia" + "valoperpub",
                        bech32PrefixConsAddr: "celestia" + "valcons",
                        bech32PrefixConsPub: "celestia" + "valconspub",
                    },
                    currencies: [
                        {
                            coinDenom: "TIA",
                            coinMinimalDenom: "utia",
                            coinDecimals: 6,
                            coinGeckoId: "celestia",
                        },
                    ],
                    feeCurrencies: [
                        {
                            coinDenom: "TIA",
                            coinMinimalDenom: "utia",
                            coinDecimals: 6,
                            coinGeckoId: "celestia",
                            gasPriceStep: {
                                low: 0.01,
                                average: 0.025,
                                high: 0.04,
                            },
                        },
                    ],
                    stakeCurrency: {
                        coinDenom: "TIA",
                        coinMinimalDenom: "utia",
                        coinDecimals: 6,
                        coinGeckoId: "celestia",
                    },
                });

                const chainId = params.chainId;
                await window.keplr.enable(chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const accounts = await offlineSigner.getAccounts();
                const address = accounts[0].address;
                onKeplrAddress(address);
            } catch (e) {
                alert("Failed to suggest the chain");
                console.log(e);
            }
        }
    }

    return (
        <div>
            <button className="connect-btn" onClick={add}>
                Connect Wallet
            </button>
        </div>
    );
}
