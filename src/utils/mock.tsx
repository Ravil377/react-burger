import { TOrder } from "./chema";

export const response_order = {
    "success": true,
    "name": "Space антарианский флюоресцентный бургер",
    "order": {
        "ingredients": [
            {
                "_id": "643d69a5c3f7b9001cfa0943",
                "name": "Соус фирменный Space Sauce",
                "type": "sauce",
                "proteins": 50,
                "fat": 22,
                "carbohydrates": 11,
                "calories": 14,
                "price": 80,
                "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0945",
                "name": "Соус с шипами Антарианского плоскоходца",
                "type": "sauce",
                "proteins": 101,
                "fat": 99,
                "carbohydrates": 100,
                "calories": 100,
                "price": 88,
                "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            }
        ],
        "_id": "64e1916b82e277001bfa9eab",
        "owner": {
            "name": "Равиль",
            "email": "hosth819@gmail.com",
            "createdAt": "2023-08-17T01:55:11.550Z",
            "updatedAt": "2023-08-17T01:55:11.550Z"
        },
        "status": "done",
        "name": "Space антарианский флюоресцентный бургер",
        "createdAt": "2023-08-20T04:07:07.734Z",
        "updatedAt": "2023-08-20T04:07:07.975Z",
        "number": 17146,
        "price": 1156
    }
}

export const ingredientMock = {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0
}

export const userMock = {
    email: 'ravil@yandex.ru',
    name: 'Ravil'
}

export const ingredientWithCountMock = {
    _id: "60d3b41abdacab0026a733cb",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
    count: 1,
    key: 333
}

export const selectIngredientsWithIgredientsState = {
    selectIngredients: [
        {
            "_id": "643d69a5c3f7b9001cfa0943",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0945",
            "name": "Соус с шипами Антарианского плоскоходца",
            "type": "sauce",
            "proteins": 101,
            "fat": 99,
            "carbohydrates": 100,
            "calories": 100,
            "price": 88,
            "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            "__v": 0
        }
    ],
    postOrder: null,
    order: 0,
    isLoading: false,
    isError: false
};

export const changeIngredients = [
    {
        "_id": "643d69a5c3f7b9001cfa0945",
        "name": "Соус с шипами Антарианского плоскоходца",
        "type": "sauce",
        "proteins": 101,
        "fat": 99,
        "carbohydrates": 100,
        "calories": 100,
        "price": 88,
        "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0943",
        "name": "Соус фирменный Space Sauce",
        "type": "sauce",
        "proteins": 50,
        "fat": 22,
        "carbohydrates": 11,
        "calories": 14,
        "price": 80,
        "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        "__v": 0
    }
]

export const feedMock: TOrder = {
    _id: "62ce92f042d34a001c276ea3",
    ingredients: [
      "60d3b41abdacab0026a733cf",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733ce"
    ],
    status: "done",
    name: "Space антарианский традиционный-галактический бургер",
    createdAt: "2023-08-19T09:40:00.764Z",
    updatedAt: "2023-08-19T09:40:01.130Z",
    number: 36436
}