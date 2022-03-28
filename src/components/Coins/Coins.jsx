import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CoinItem from '../CoinItem/CoinItem';
import Coin from '../routes/Coin';
import Spinner from '../Spinner/Spinner'
import searchIcon from './search-3-32.ico'

import './Coins.css';


const Coins = () => {

    const [isloading, setIsLoading] = useState(true)
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState()

    const isMounted = useRef(true)

    // const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false



    const loadMore = () => {
        setPage(page => page + 1)
    }

    const fetchOnSearch = async () => {
        isMounted.current = true
        if (searchText !== '' && isMounted) {
            await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchText}`).then((response) => {
                setCoins(response.data.coins)
                console.log(response.data.coins)
            }).catch(error => {
                console.log(error)
            })
        }
        setIsLoading(false)
        isMounted.current = false
    }

    const onChange = (e) => {
        setSearchText(e.target.value)
        setTimeout(() => {
            fetchOnSearch()
        }, 500);

    }

    const fetchAll = async () => {
        await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&page=${page}&per_page=10`).then((response) => {
            setCoins(coins => [...coins, ...response.data])
            // console.log(response)
        }).catch(error => {
            console.log(error)
        })

        setIsLoading(false)
        isMounted.current = false
    }

    useEffect(() => {
        fetchAll()
    }, [page, searchText])




    if (isloading) {
        return <Spinner />
    }

    return (
        <div className='container'>
            <div>

                <div className='heading'>
                    <img src={searchIcon} alt="icon" />
                    <input
                        ref={isMounted}
                        className='search'
                        type="text"
                        value={searchText}
                        placeholder='Search coin'
                        onChange={onChange}
                    />
                </div>

                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Mkt Place</p>
                </div>

                
                {coins.map(coins => {
                    return (
                        <Link to={`coin/${coins.id}`} element={<Coin />} key={coins.id}>
                            <CoinItem coins={coins} />
                        </Link>
                    )})
                }
                <button className='load-more' onClick={loadMore}>Load More</button>
            </div>
        </div>
    );
};

export default Coins;
