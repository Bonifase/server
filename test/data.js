const testData = () => {
    return {
        user1: {
            name: "Test user",
            email: "email@gmail.com",
            password: "pas21tvtg"
        },
        user2: {
            name: "Test user",
            email: "emails@gmail.com",
            password: "pas21445g"
        },
        user3: {
            name: "",
            email: "email@gmail.com",
            password: "26y7844tg"
        },
        user4: {
            name: "Test",
            email: "",
            password: "uiuhott"
        },
        user5: {
            name: "user4",
            email: "emailme@gmail.com",
            password: ""
        },
        guest: {
            name: "Test guest",
            phone: "9737-2323-131",
            dietary: "Vegan",
            isconfirmed: false
        }
    
    }
}

module.exports = testData;