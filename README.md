# WorldAds

It is an anonymous Quadratic funding mechanism for a public billboard using Semaphore proofs. World Id helps prevent sybil resistance, without which this idea was not viable. 
 ## [Try it out](https://worldads.vercel.app/)
### Inspiration 
[Vitalik's Article](https://vitalik.ca/general/2019/12/07/quadratic.html)
 

## How does it work ?
An admin creates a Billboard , where they store 6 images in the contract using ipfs/filecoin. The Billboard displays the Ads in different sizes on the screen . The ratio given to an Ad depends on the votes it has in relative to other Ads. If you want a particular Ad to get big space in the screen, you signal your vote by paying some amount which is determined using a special formula.

## How is the cost of Voting Calculated?
```
Cost = 0.1 Matic  * (n+1) 
Where, n = The number of times you have signalled a particular Hash
```
 For every individual , the n is different, based on there individual preferences. Signalling becomes expensive as you signal an Ad in particular. 
 
 ## Relevant Information
 
 The contracts are currently deployed on Polygon Mumbai . Development WorldId is used for Hackathon purposes as we don't have our Iris scanned(yet!).
 For MVP purposes, there' s only 1 Billboard where you can vote.
 
 
 ## Stack Used 
 - Chakra
 - Rainbow
 - Tailwind
 - WorldId
 - Filecoin
 - Polygon
 - Foundry





## Install locally
 ```
 yarn
 ```
 ```
 yarn dev
 
 ```
