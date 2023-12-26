'use client'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import interactItem from '../../components/interactItem';
import chectMeta from "../../components/chectMeta";

export const dynamicParams = true;

export default function page({ params }){
    const id = params.id;
    const { isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();  
    const { item , loading , buyitem } = interactItem(id);
    return(
       <main className="w-screen ">
            <div className='grid justify-items-center'>
                
                {!isConnectedRef.current && <h1 className='text-xl'>Welcome, connect Metamask to buy or or sell item (Dashboard too)</h1>}
                {isConnectedRef.current && 
                    <>
                        {item && !loading ? 
                            <div className='w-2/3'>
                                <h1>Item Details</h1>
                                <ul>
                                    <Image
                                        src={`https://ipfs.io/ipfs/${item.image}`}
                                        alt={item.name}
                                        width='0'
                                        height='0'
                                        sizes="50vw"
                                        className="w-auto h-96 mx-auto"
                                        priority={true}
                                    >
                                    </Image>
                                    <li>Item ID: {id}</li>
                                    <li>Item Address: {item.address}</li>
                                    <li>Item Name: {item.name}</li>
                                    <li>Item Price: {item.price }</li>
                                    <li>Item Seller: {item.seller}</li>
                                    <li>Item State: {item.isSold ? "Sold": "OnSale" }</li>
                                    <li>Item Type: {item.type}</li>
                                    <li>Item Description: {item.description}</li>
                                </ul>
                                <br />
                                {isConnectedRef.current &&
                                    <div>
                                        {item.isSold ? 
                                            <div className="text-red-500">Sold</div> : 
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full"
                                            onClick={() => {buyitem(item.id, item.address, item.price)}}
                                        >
                                            BUY
                                        </button>}
                                    </div>
                                }
                            </div>
                        
                        : 
                            <div>
                                <main className="text-center">
                                    <h2 className="text-primary">Loading...</h2>
                                    <p>Hopefully not for too long :)</p>
                                </main>
                            </div>
                        }
                    </>
                }
             
        </div>
    </main>
    )

}