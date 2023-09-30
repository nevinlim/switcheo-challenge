import React, { useState, useEffect, useMemo } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  class Datasource { //takes a url with prices and fetches them
    constructor(private url: string) {}
  
    async getPrices(): Promise<any> {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(error);
            return {};
          }
    }
  }

  interface BoxProps {
    children?: React.ReactNode;
  }
  
  const WalletPage: React.FC<BoxProps> = (boxprops: BoxProps) => {
    const balances = useWalletBalances(); //useWalletBalance gets walletbalance using state of walletBalance 
    const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then((newPrices) => {
        setPrices(newPrices);
      }).catch(error => {
        console.error(error); //corrected misspelling
      });
    }, []);
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100;
        case 'Ethereum':
          return 50;
        case 'Arbitrum':
          return 30;
        case 'Zilliqa':
        case 'Neo':
          return 20;
        default:
          return -99;
      }
    }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }
        return false;
      }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
    }, [balances, prices]);
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed()
    }));
  
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row} //if classes.row is a valid css file
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  
    return (
      <div {...boxprops}>
        {rows}
      </div>
    );
  }
  