import { BUTTON_ACTIVE, BUTTON_INACTIVE, CHANGE, CLEAN, FILL, MATCH, SUCCESS, VALIDATION } from "./types";

export function fill(character){

    return {
        type: FILL,
        payload: character,
    }
}

export function success(character){

    return {
        type: SUCCESS,
        payload: character,
    }
}

export function match(character){

    return {
        type: MATCH,
        payload: character,
    }
}
export function clean(){

    return{
        type: CLEAN,
    }
}

export function change(id){

    return{
        type: CHANGE,
        payload:id,
    }
    
}

export function validation(){

    return{

        type:VALIDATION
    }
}

export function buttonActive(){

    return{
        type: BUTTON_ACTIVE
    }
}

export function butttonInactive(){

    return{
        type: BUTTON_INACTIVE
    }
}
