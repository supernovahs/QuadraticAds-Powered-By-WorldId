// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

/// @notice Quadratic Ads contract using world Id for sybil resistance
/// @author supernovahs.eth <supernovahs@proton.me>  
contract Contract {
    using ByteHasher for bytes;

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();
    error NOT_ADMIN();
    error AD_NOT_AVAILABLE();
    error INCORRECT_VALUE();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    uint  public groupId  = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    /// @dev Whether hash is added or not
    mapping(string => bool) public Adhash;

    /// @dev Ads Weightage
    mapping(string => uint) public weightage;

    /// @dev Counter of how many times have a user  voted on a particular Ad 
    mapping(uint => mapping(string => uint)) public IdentitytoHashtoCounter;

    /// @dev Address of admin, who shall be able to add new ads hash 
    address public admin;
    
    ////////////// EVENTS //////////////////

    event NewAd(string indexed hash);
    event Funded(string indexed hash,uint timestamp);


    /// @param _worldId The WorldID instance that will verify the proofs
    constructor(IWorldID _worldId,address _admin) {
        worldId = _worldId;
        admin = _admin;
    }

/// @dev Checks whether msg.sender is admin or not.
    modifier onlyAdmin() {
        if(msg.sender != admin){
            revert NOT_ADMIN();
        }
        _;
    }

 

/// @param _hash Ipfs hash of the particular ad 
    function approveAd(string calldata _hash) external onlyAdmin() {
       Adhash[_hash] = true;
        emit NewAd(_hash);
    }

/// @param _hash Ipfs hash of the particular ad 
/// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
/// @param root The root of the Merkle tree (returned by the JS widget).
/// @param _nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
/// @param proof The zero-knowledge proof that demostrates the claimer is registered with World ID (returned by the JS widget).

    function Fund(string calldata _hash,string calldata signal,
        uint256 root,
        uint256 _nullifierHash,
        uint256[8] calldata proof) external payable  {
        if(!Adhash[_hash]){
            revert AD_NOT_AVAILABLE();
        }
        uint cost = Cost(_hash,_nullifierHash);
        if(msg.value != cost ){
            revert INCORRECT_VALUE();
        }
         worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            _nullifierHash,
            abi.encodePacked('wid_staging_c281398b476d06d1426bb2242c05a073').hashToField(),
            proof
        );
        
        weightage[_hash] ++;

        emit Funded(_hash,weightage[_hash]);
       
    }

/// @param _hash Ipfs hash of the particular ad 
/// @param _nullifierHash of the person

    function Cost(string calldata _hash,uint _nullifierHash) public view returns(uint) {

       uint n =  IdentitytoHashtoCounter[_nullifierHash][_hash] ;
       uint next_cost = 10000000000000000 * (n + 1 ); // 0.01 Eth * no of times its funded
       return (next_cost);

    }


    
}
