import { ethers } from 'ethers'
import React, { useState } from 'react'
import VotingBallot_abi from './VotingBallot_abi.json'

const VotingBallot = () => {
  //initialize deployed contract address & abi
  const contractAddress = '0x6644cbDaC8b509cd0D8F8c808445521fd5272414'

  const [errorMessage, setErrorMessage] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [connectButtonText, setConnectButtonText] =
    useState('1. Connect Wallet')
  const [startVoteText, setStartVoteText] = useState('2. Start Vote')
  const [submitVoteText, setSubmitVoteText] = useState('4. Submit Vote')
  const [defaultAccount, setDefaultAccount] = useState(null)

  const [candidate1Name, setCandidate1name] = useState(null)
  const [candidate2Name, setCandidate2name] = useState(null)
  const [candidate3Name, setCandidate3name] = useState(null)

  let [candidate1Vote, setCandidate1Vote] = useState(null)
  let [candidate2Vote, setCandidate2Vote] = useState(null)
  let [candidate3Vote, setCandidate3Vote] = useState(null)

  const [storeCandidateVote, setStoreCandidateVote] =
    useState('Vitalik Buterin')

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0])
          setConnectButtonText(result[0])
        })
    } else {
      setErrorMessage('Error: You need to install Metamask in your Browser!')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    updateEthers()
  }

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(
      contractAddress,
      VotingBallot_abi,
      tempSigner
    )
    setContract(tempContract)
    updateCandidates(tempContract)
  }

  const updateCandidates = async (tempContract) => {
    //candidate 1
    const cand1 = await tempContract.candidates(0)
    const cand1name = cand1.name
    let cand1voteCount = parseInt(cand1.voteCount, 16)
    //candidate 2
    const cand2 = await tempContract.candidates(1)
    const cand2name = cand2.name
    let cand2voteCount = parseInt(cand2.voteCount, 16)
    //candidate 3
    const cand3 = await tempContract.candidates(2)
    const cand3name = cand3.name
    let cand3voteCount = parseInt(cand3.voteCount, 16)

    setCandidate1name(cand1name)
    setCandidate2name(cand2name)
    setCandidate3name(cand3name)

    setCandidate1Vote(cand1voteCount)
    setCandidate2Vote(cand2voteCount)
    setCandidate3Vote(cand3voteCount)

    console.log(cand1)
    console.log(cand1name)
    console.log(cand1voteCount)
    console.log(typeof cand1voteCount)
  }

  const startVote = async (event) => {
    event.currentTarget.disabled = true
    setStartVoteText('Awaiting Confirmation...')

    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(
      contractAddress,
      VotingBallot_abi,
      tempSigner
    )

    await tempContract.startVote()
    setStartVoteText('Voting Started!')
  }

  const assignVote = async (event) => {
    event.currentTarget.disabled = true
    setSubmitVoteText('Awaiting Confirmation...')

    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(
      contractAddress,
      VotingBallot_abi,
      tempSigner
    )

    if (storeCandidateVote === candidate1Name) {
      candidate1Vote++
      await tempContract.vote(0)
      setCandidate1Vote(candidate1Vote)
    }
    if (storeCandidateVote === candidate2Name) {
      candidate2Vote++
      await tempContract.vote(1)
      setCandidate2Vote(candidate2Vote)
    }
    if (storeCandidateVote === candidate3Name) {
      candidate3Vote++
      await tempContract.vote(2)
      setCandidate3Vote(candidate3Vote)
    }

    setSubmitVoteText('Vote Confirmed!')
    event.preventDefault()
  }

  return (
    <>
      <div className='shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex bg-white py-4'>
          <h3 className='text-xl font-medium px-5 text-black font-body'>
            {'Voting Dapp'}
          </h3>
          <button
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-body hover:text-white py-1 px-10 border border-blue-500 hover:border-transparent rounded'
            onClick={connectWalletHandler}
          >
            {connectButtonText}
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='container mx-auto flex-center'>
        <div className='overflow-x-auto'>
          <div className='p-1.5 w-full inline-block align-middle'>
            <div className='overflow-hidden border rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-body text-mid text-gray-500 uppercase '
                    >
                      Candidate
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-body text-mid text-gray-500 uppercase '
                    >
                      Number of Votes
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                      {candidate1Name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {candidate1Vote}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                      {candidate2Name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {candidate2Vote}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                      {candidate3Name}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {candidate3Vote}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <button
        className='bg-blue-500 text-white font-body py-2 px-4 rounded'
        onClick={startVote}
      >
        {startVoteText}
      </button>
      <br></br>
      <br></br>
      <div>
        <form>
          <label className='font-body'>3. Select Candidate: </label>
          <select
            className='inline-flex w-1/7 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-body text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
            value={storeCandidateVote}
            onChange={(e) => setStoreCandidateVote(e.target.value)}
          >
            <option value={candidate1Name}>{candidate1Name}</option>
            <option value={candidate2Name}>{candidate2Name}</option>
            <option value={candidate3Name}>{candidate3Name}</option>
          </select>
          <br></br>
          <br></br>
          <div>
            <button
              className='bg-blue-500 text-white font-body py-2 px-4 rounded'
              onClick={assignVote}
            >
              {submitVoteText}
            </button>
          </div>
        </form>
        <br></br>
        {errorMessage}
      </div>
    </>
  )
}

export default VotingBallot
