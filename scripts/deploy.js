async function main() {
  const Ballot = await ethers.getContractFactory('Ballot')

  // Start deployment, returning a promise that resolves to a contract object
  const ballot = await Ballot.deploy([
    'Vitalik Buterin',
    'Cobie',
    'Jerome Powell',
  ])
  console.log('Contract deployed to address:', ballot.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
