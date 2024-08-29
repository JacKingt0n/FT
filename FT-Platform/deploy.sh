#!/bin/bash
if [ "$1" == "mainnet" ]; then
  truffle migrate --network mainnet
elif [ "$1" == "rinkeby" ]; then
  truffle migrate --network rinkeby
else
  truffle migrate --network development
fi
