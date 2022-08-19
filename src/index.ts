import {createStore, combineReducers} from 'redux'
enum Actions {
    CREATE_CLAIM ='CREATE _CLAIM', 
    CREATE_POLICY='CREATE_POLICY',
    DELETE_POLICY='DELETE_POLICY'
}

interface ActionsInterface{
    type:Actions
    payload:{
        name:string
        amount?:number
        claim?:number
    }
}

const createClaim =( name:string, amount:number):ActionsInterface=>{
    return{
        type:Actions.CREATE_CLAIM,
        payload:{
            name,
            amount
        }
    }
}

const deleteClaim  =( name:string):ActionsInterface=>{
    return{
        type:Actions.DELETE_POLICY,
        payload:{
            name
        }
        
    }
}

const createPolicy =( name:string, amount:number):ActionsInterface=>{
    return{
        type:Actions.CREATE_POLICY,
        payload:{
            name,
            amount 
        }
    }
}


const policies = (listofPolicies:{name:string}[]=[] , action:ActionsInterface)=>{
    if(action.type===Actions.CREATE_POLICY){
        return [...listofPolicies, action.payload.name]
    }else if(action.type===Actions.DELETE_POLICY){
        return[...listofPolicies.filter(item=>{
            item.name !==action.payload.name
        })]
    }
    return listofPolicies
}

const claimsHistory = (oldListofClaims:[]=[], action:ActionsInterface)=>{
    if(action.type === Actions.CREATE_CLAIM){
        return [...oldListofClaims, action.payload]
        
    }

    return oldListofClaims

}


const accountsDepartment=(moneybag:number=100 , action:ActionsInterface)=>{

    if(action.type ==Actions.CREATE_CLAIM){
        if(action.payload.claim){
            return moneybag - action.payload.claim
        }
    } else if(action.type===Actions.CREATE_POLICY){
        if(action.payload.amount){
            return moneybag + action.payload.amount
        }
    }
    return moneybag

}


const ourdepartment = combineReducers({
    claimsdepartment :claimsHistory,
    policiesDepartment:policies,
    accountingDepartment:accountsDepartment

})


const store= createStore(ourdepartment)


console.log(store.getState());
