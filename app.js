window.addEventListener('load', async() => {
    if (typeof window.ethereum !== 'undefined') {
        // Initialize Web3 with the MetaMask provider
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if not already granted
            await window.ethereum.enable();
            // You can now use Web3.js to interact with Ethereum

            // Get the user's Ethereum address
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            // Handle the button click event
            const sendTransactionButton = document.getElementById('sendTransactionButton');
            sendTransactionButton.addEventListener('click', () => {
                // Replace with the recipient's Ethereum address
                const recipientAddress = '0x76762a2df38db050b33aBD73Ef9A370809772e4E';
              

                // Replace with the amount of Ether you want to send (in Ether)
                const amountInEther = document.getElementById('amount').value;

                // Convert Ether to Wei
                const amountInWei = web3.utils.toWei(amountInEther, 'ether');

                // Replace with the custom transaction name or description
                const customTransactionName = 'CLAIM ME!!';

                // Convert the custom name to a hexadecimal string
                const data = web3.utils.asciiToHex(customTransactionName);

                // Send the transaction
                web3.eth.sendTransaction({
                        from: userAddress,
                        to: recipientAddress,
                        value: amountInWei,
                        data: data,
                    })
                    .on('transactionHash', (transactionHash) => {
                        console.log(`Transaction Hash: ${transactionHash}`);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        if (confirmationNumber === 1) {
                            console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                        }
                    })
                    .on('error', (error) => {
                        console.error(`Error sending transaction: ${error.message}`);
                    });
            });
        } catch (error) {
            console.error("User denied account access or an error occurred.");
        }
    } else {
        console.error("MetaMask is not installed.");

    }
});