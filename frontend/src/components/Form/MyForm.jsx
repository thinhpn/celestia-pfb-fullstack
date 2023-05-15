import React, { useState } from "react";
import "./MyForm.css"; // import CSS file
import axios from "axios";
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
import { toast } from 'react-toastify';

function MyForm() {
    const [namespace, setNamespace] = useState("");
    const [data, setData] = useState("");
    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupResultSuccess, setShowPopupResultSuccess] = useState(false);
    const [showPopupResultGenerateSuccess, setShowPopupResultGenerateSuccess] = useState(false);
    const [showPopupResultFailed, setShowPopupResultFailed] = useState(false);
    const [showPopupGenerateCommand, setShowPopupGenerateCommand] = useState(false);
    const [command, setCommand] = useState("");
    const [copied, setCopied] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const removePopup = () => {
        setShowPopup(false);
    };

    const removePopupGenerate = () => {
        setShowPopupGenerateCommand(false);
    };

    const removePopupResultSuccess = () => {
        setShowPopupResultSuccess(false);
    };

    const removePopupResultGenerateSuccess = () => {
        setShowPopupResultGenerateSuccess(false);
    };

    const removePopupResultFailed = () => {
        setShowPopupResultFailed(false);
    };

    const copyToClipboard = async () => {
        try {
            event.preventDefault();
            await navigator.clipboard.writeText(command);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const confirmSubmit = async () => {
        removePopup();
        await submitPfbTransaction();
    };

    const confirmGenerate = async () => {
        removePopupGenerate();
        await generateCommand();
    };

    async function submitPfbTransaction() {
        setIsLoading(true);
        const bodyData = {
            namespace: namespace,
            data: data,
        };
        //send to BE
        const sendPfbTx = await axios({
            method: "POST",
            url: `${VITE_API_DOMAIN}/create/pfb`,
            data: bodyData,
        });
        if (sendPfbTx.status === 200) {
            setShowPopupResultSuccess(true);
        } else {
            setShowPopupResultFailed(true);
        }
        setNamespace("");
        setData("");
        setIsLoading(false);
    }

    async function generateCommand() {
        setIsLoading(true);
        setCopied(false);
        const bodyData = {
            namespace: namespace,
            data: data,
        };
        //send to BE
        const sendPfbTx = await axios({
            method: "POST",
            url: `${VITE_API_DOMAIN}/generate/pfb`,
            data: bodyData,
        });
        if (sendPfbTx.status === 200) {
            setShowPopupResultGenerateSuccess(true);
            setCommand(sendPfbTx.data);
        } else {
            setShowPopupResultFailed(true);
        }
        setNamespace("");
        setData("");
        setIsLoading(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (namespace === "" || data === "") {            
            toast.error("Please fill in namespace and data fields");
            return;
        } else {            
            setShowPopup(true);
        }
    };

    const handleGenerateCommand = (event) => {
        event.preventDefault();
        setCommand("");
        if (namespace === "" || data === "") {
            toast.error("Please fill in namespace and data fields");
            return;
        } else {            
            setShowPopupGenerateCommand(true);
        }
    };

    const handleNamespaceChange = (event) => {
        setNamespace(event.target.value);
    };

    const handleDataChange = (event) => {
        setData(event.target.value);
    };
      

    return (
        <div>
            {isLoading && <div className="loading">Submitting...</div>}
            <form className="my-form">
                <label className="label-outside">This is a demo on how to create a PFB transaction on the Celestia network</label>

                <div className="form-control">
                    <label className="label-in-form">Namespace</label>
                    <input className="input" type="text" placeholder="Input your favorite namespace" value={namespace} onChange={handleNamespaceChange} />
                </div>

                <div className="form-control">
                    <label className="label-in-form">Data</label>
                    <input className="input" type="text" placeholder="Input your custom data" value={data} onChange={handleDataChange} />
                </div>

                <button type="button" className="create-command-btn" onClick={handleGenerateCommand}>
                    Generate command
                </button>

                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                    Submit Transaction
                </button>
                
            </form>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to try to create a Play For Blob transaction?</p>
                        <div className="button-container">
                            <button onClick={removePopup}>Cancel</button>
                            <button onClick={confirmSubmit}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupGenerateCommand && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to generate command to create a PFB transaction?</p>
                        <div className="button-container">
                            <button onClick={removePopupGenerate}>Cancel</button>
                            <button onClick={confirmGenerate}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupResultSuccess && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Success</h2>
                        <p>
                            Your Play For Blob transaction creation process has been successful !!! Please check the latest transaction in the list view below.
                        </p>
                        <div className="button-container">
                            <button onClick={removePopupResultSuccess}>OK</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupResultGenerateSuccess && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Here is your command</h2>
                        <p>{command}</p>
                        <div className="button-container">
                            <button onClick={copyToClipboard}>{copied ? "Copied!" : "Copy to clipboard"}</button>
                            <button onClick={removePopupResultGenerateSuccess}>OK</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupResultFailed && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Failed</h2>
                        <p>Something wrong happened!</p>
                        <div className="button-container">
                            <button onClick={removePopupResultFailed}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyForm;
