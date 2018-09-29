const urls = {
    main: '/',
    login: '/signin',
    register: '/signup',
    constructor: '/new', //query параметр для шаблонов type = transport | med | cv ... но я еще не уверен что это понадобиться
    view: '/qr/{id}', // ссылка на отсканенный qr || здесь еще будет 404 показываться красивый, типо лиюо приватный лиюо удален либо неправильный qr
    edit: '/qr/{id}/edit'
}

const models = {
    login: { //POST
        username: 'string', //хотелось бы замарочиться с email
        password: 'string' //надо будет узнать, где че хешировать и как
    },
    register: { //POST
        username: 'string', //хотелось бы замарочиться с email
        password: 'string', //надо будет узнать, где че хешировать и как
        confirm: 'string' //надо будет узнать, где че хешировать и как
    },
    view: { //GET
        id: "string" // это будет параметр урла host/qr/{id}
    },
    edit: { //PATCH
        page // описан ниже
    },
    constructor: { //POST
        page // описан ниже
    },
    delete: { //DELETE
        id: "string" // это будет параметр урла host/delete/{id}
    }
}

const page = {
    name: 'string',
    isPrivate: 'boolean',
    fields: [{
        name: 'string',
        value: 'string'
    }]
}

/* было бы круто намутить механизм типо Пожаловаться
    и если выполняется некая логика обработки количества и качества жалоб
    блокировать qr и отдавать чет типо
    Данная страница была заблакирована из-за неприемлимого контента
*/

/* еще есть крутая идея, но очень маловероятно что сделаем
    когда сканят qr код отправлять геопозицию на бэк и хранить,
    потом показывать пользователю на карте где сканили)
*/