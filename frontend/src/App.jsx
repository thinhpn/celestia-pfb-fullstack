import React from 'react';
import { useState, useEffect } from "react";
import celestiaLogo from "/celestia.png";
import "./App.css";
import MyForm from "./components/Form/MyForm";
import axios from "axios";
import ConnectCelestiaWallet from "./components/Wallet/ConnectCelestiaWallet";
import ListView from "./components/ListView/ListView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [keplrAddress, setKeplrAddress] = useState(null);
    const [namespaceShare, setNamespaceShare] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const MASTER_ACCOUNT = import.meta.env.VITE_MASTER_ACCOUNT;
    const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

    function handleKeplrAddress(address) {
        setKeplrAddress(address);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchTransactions();
            fetchNodeBalance();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    async function fetchTransactions() {
        let { data } = await axios({
            method: "GET",
            url: `${VITE_API_DOMAIN}/transactions?wallet=${MASTER_ACCOUNT}`,
            maxContentLength: 100000000,
        });
        setTransactions(data.data.message);
    }

    async function fetchNodeBalance() {
        let { data } = await axios({
            method: "GET",
            url: `${VITE_API_DOMAIN}/balance?wallet=${MASTER_ACCOUNT}`,
            maxContentLength: 100000000,
        });
        setBalance(data.data.message);
    }

    //for view namespace shared
    async function handleButtonViewNamespaceShared({ namespaceId, height }) {
        setIsLoading(true);
        setCopied(false);
        let { data } = await axios({
            method: "GET",
            url: `${VITE_API_DOMAIN}/namespaced-shares?height=${height}&namespace_id=${namespaceId}`,
            maxContentLength: 100000000,
        });
        setNamespaceShare(JSON.stringify(data.data.message.shares));
        setIsLoading(false);
    }

    const removePopupShare = () => {
        setNamespaceShare("");
    };

    const copyToClipboard = async () => {
        try {
            setCopiedAddress(false);
            await navigator.clipboard.writeText(namespaceShare);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const copyAddressToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(keplrAddress);
            setCopiedAddress(true);
            toast.success('Copied!');
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const disconnectWallet = () => {
        toast.error('Disconnected!');
        setKeplrAddress(null);
    };

    return (
        <div className="App">
            <div>
                <a href="https://celestia.org/" target="_blank">
                    <img src={celestiaLogo} className="logo" alt="Celestia logo" />
                </a>
            </div>
            <h2 style={{ marginBottom: 0, marginTop: 0 }}>
                Celestia Incentivized Testnet by{" "}
                <a href="https://github.com/thinhpn" target="_blank">
                    allinlink#6932
                </a>{" "}
            </h2>

            {keplrAddress && (
                <h3 style={{ marginBottom: 0, marginTop: 10 }}>
                    My Wallet: ${MASTER_ACCOUNT} | Balance: {balance} TIA
                </h3>
            )}

            <hr style={{ marginBottom: 0 }} />

            {isLoading && <div className="loading">Querying...</div>}

            {!keplrAddress && <h3 style={lableStyle}>✨Please connect your Keplr wallet to continue✨</h3>}
            {!keplrAddress && (
                <div style={buttonContainerStyle}>
                    <ConnectCelestiaWallet params={BLOCKSPACERACE_PARAMS} onKeplrAddress={handleKeplrAddress} />
                </div>
            )}

            {keplrAddress && (
                <div style={walletStyle}>
                    <p style={addressStyle}>Connected wallet: {keplrAddress}</p>
                    <button style={buttonStyle} onClick={copyAddressToClipboard}>
                        <FontAwesomeIcon icon={faCopy} style={{ marginRight: "5px" }} />
                        Copy Address
                    </button>
                    <button style={buttonStyle} onClick={disconnectWallet}>
                        <FontAwesomeIcon icon={faTimes} style={{ marginRight: "5px" }} />
                        Disconnect
                    </button>
                </div>
            )}

            {keplrAddress && (
                <div>
                    <MyForm></MyForm>
                </div>
            )}
            {keplrAddress && (
                <div>
                    <h3 style={{ textAlign: "left" }}>History PFB Transactions</h3>
                    <ListView data={transactions} onButtonClick={handleButtonViewNamespaceShared}></ListView>
                </div>
            )}
            {namespaceShare && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Your namespaced shares</h2>
                        <p>{namespaceShare}</p>
                        <div className="button-container">
                            <button onClick={copyToClipboard}>{copied ? "Copied!" : "Copy to clipboard"}</button>
                            <button onClick={removePopupShare}>OK</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
const buttonContainerStyle = {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
    display: "flex",
    justifyContent: "center",
};

const lableStyle = {
    marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
};

const walletStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "5px",
};

const addressStyle = {
    textAlign: "center",
    borderRadius: "5px",
    color: "#FF3300", // set the text color to white
    fontSize: 16,
    fontWeight: "bold",
    padding: "10px", // add padding to the container for spacing
};

const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "16px",
    padding: "10px",
    backgroundColor: "#FFFFFF",
    color: "#FF3300",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
};

buttonStyle["&:hover"] = {
    backgroundColor: "#FF3300",
    color: "#FFFFFF",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

buttonStyle["&:active"] = {
    backgroundColor: "#FF3300",
    color: "#FFFFFF",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
};

const BLOCKSPACERACE_PARAMS = {
    chainId: "blockspacerace",
    chainName: "Blockspace Race Testnet",
    rpc: "https://rpc-blockspacerace.pops.one",
    rest: "https://api-blockspacerace.pops.one",
};

export default App;
