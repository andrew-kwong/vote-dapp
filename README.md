# Voting Dapp Instructions

The deployed contract address to the Polygon Mumbai network is
0x6644cbDaC8b509cd0D8F8c808445521fd5272414
and was deployed via Alchemy. 

To run this program,

1. Download the files onto your drive
2. From the root directory of the project, run `npm i`
3. Add a `.env` file to the root directory of the project with the following parameters:

`API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"`

`PRIVATE_KEY = "your-metamask-private-key"`

4. Run `npm start` (this will open the dapp on your localhost).
5. On the dapp, click on `Connect Wallet` to link to your Metamask wallet.
6. Click on `Start Vote` to give the smart contract authorization to allow voting.
7. On the `Select Candidate dropdown`, click on any candidate you wish to vote for.
8. Click `Submit Vote` to confirm your candidate choice.



Enjoy!
