"use client"
import { useState, useEffect, useRef } from 'react'

const ethers = require("ethers");

export default function chectMeta() {
    const [isConnected, setIsConected] = useState(false)
    const [shownText, setShownText] = useState('Connect')
    const [account, setAccount] = useState('')
    const [gasfee, setGasfee] = useState("?")

    async function checkConnection() {
        if (typeof window.ethereum !== 'undefined') {
            setShownText("Connecting...")
            try{
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                if(!accounts.length){
                    setIsConected(false);
                    setShownText("Not Connected");
                }else{
                    setIsConected(true);
                    setAccount(accounts[0]);
                    setShownText("Connected");
                }
            }catch(err){
                if(err.code == 4001){
                    setIsConected(false);
                    setShownText("Not Connected");
                }
            }
        }else{
            setShownText("Please install the MetaMask extension")
        }
    }
    
    async function checkConnection2() {
        if (typeof window.ethereum !== 'undefined') {
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                const gasPrice = await provider.getGasPrice()
                if(!accounts.length){
                    setShownText("Not Connected");
                    setIsConected(false);
                    
                }else{
                    setShownText("Connected");
                    setIsConected(true);
                    setGasfee(ethers.utils.formatUnits(gasPrice, "ether"))
                    setAccount(accounts[0]);
                    // console.log(gasfeeRef.current)
                }
            }catch(err){
                // if(err.code === 4001){
                //     setShownText("Not Connected");
                //     setConection(false);
                // }
            }
        }else{
            setShownText("Please install the MetaMask extension")
        }
    }
    
    useEffect(() => {
        checkConnection()
        const intervalId = setInterval(() => {
            checkConnection2()
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return {
        isConnected,
        shownText,
        account,
        gasfee,
        checkConnection
    }
}
