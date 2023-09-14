const REQUIRED_FIELD = 'Обязательно для заполнения'

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {

        if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return 'Некорректный email адрес'
        }


        return true;
    }
}

export const numberValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {
        if (!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
            return 'Некорректный номер телефона'
        }

        return true;
    }
}

export const nameValidate = {
    required: REQUIRED_FIELD,
    validate: (value) => {
        if(!value.length){
            return REQUIRED_FIELD;
        }
        
        return true;
    }
}