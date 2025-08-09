// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Trace {
 
 mapping(uint256 => string) hashes;

 function addHash(uint256 id, string memory hash) public {
   hashes[id] = hash;
 }

 function getHash(uint256 id) public view returns (string memory) {
   return hashes[id];
 }
}