import { Account_Address } from "../../../exploreHeart/Account_Address";
import { Account_Token_Address } from "../../../exploreHeart/Account_Token_Address";
import { Account_transaction } from "../../../exploreHeart/Account_transaction";

export function EvmAddress(response, network, address){
    const array = response.data.data
    const results = (Account_Address(array, address, network, 0))

    console.log(results)
}

export function EvmToken(){
    
}

export function EvmTransaction(){
    
}


